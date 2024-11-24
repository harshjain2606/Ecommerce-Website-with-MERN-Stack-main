const ErrorHandler = require("../errorHandler/errorHandler");
const catchAsyncError = require("../middleWares/catchAsyncError");
const  User  = require("../models/userModel")
const sendToken = require("../util/jwt")
const sendEmail = require("../util/email")
const crypto = require('crypto')

//Register user - {{baseUrl}}/api/v1/register
exports.registerUSer = catchAsyncError(async(req,res,next) => {
    const {name, email, password}=req.body
    let avatar
    console.log(req.file)
    if(req.file){
        avatar= `/uploads/user/${req.file.originalname}`
    }
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user,201,res)
    

    
})

//Login User - {{baseUrl}}/api/v1/login
exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body
    if(!email || !password){
        return next(new Error("Please enter email & password",400))
    }
    //finding user in database
    const user =await User.findOne({email}).select('+password')
    if(!user){
        return next(new Error("Invalid email or password",401))
    }
    if(!await user.isValidPassword(password)){
        return next(new Error("Invalid email or password",401))
    }
    sendToken(user,201,res)
})

//LogOut User - {{baseUrl}}/api/v1/logout
exports.logoutUser = (req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200)
    .json({
        success:true,
        message:"LoggedOut"
    })
}

//Forgot Password - {{baseUrl}}/api/v1/password/forgot 
exports.forgotPassword = catchAsyncError( async(req,res,next)=>{
    const {email}=req.body
    const user = await User.findOne({email})
    
    if(!user){
        return next(new ErrorHandler("user not found with this email",404))
    }
    const resetToken=user.getResetToken();
    
    await user.save({validateBeforeSave:false})
    //create reset url
    let BASE_URL=process.env.FRONTEND_URL
    if(process.env.NODE_ENV==="production"){
        BASE_URL=`${req.protocol}://${req.get('host')}`
    }
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`

    const message = `Your password reset url is as follows \n\n${resetUrl} \n\n If you have not requested this email, then ignore it.`

    try{
        sendEmail({
            email:user.email,
            subject: "AzhaganExport Password Recovery",
            message
        })
        
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    }
    catch(err){
        user.resetPasswordToken=undefined;
        user.resetPasswordTokenExpire=undefined;
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(err.message,500))
    }
})

//Reset Password - {{baseUrl}}/api/v1/password/reset/:token
exports.resetPassword = catchAsyncError( async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    console.log(resetPasswordToken)
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{
            $gt: Date.now()
        }
    })
    
    if(!user){
        return next(new ErrorHandler("Password reset token invalid or expired"))
    }
    
    if(req.body.password !==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match with confirm Password"))
    }

    user.password = req.body.password;
    user.resetPasswordToken =undefined;
    user.resetPasswordTokenExpire =undefined;
    await user.save({validateBeforeSave:false})

    sendToken(user,201,res)
})
//Get user profile - {{baseUrl}}/api/v1/myprofile
exports.getUserProfile = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
})

//change Password - 
exports.changePassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password')
    //check old password
    const g=await user.isValidPassword(req.body.oldPassword)
    if(!await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler("Old Password is incorrect",401))
    }

    //assigning new password - {{baseUrl}}/api/v1/password/change
    user.password=req.body.password;
    await user.save({validateBeforeSave:false}).then(()=>{console.log("cimpel")})
    res.status(200).json({
        succes:true
    })
})

//Update Profile
exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    let newUserData = {
        name : req.body.name,
        email: req.body.email
    }
    let avatar
    
    if(req.file){
        avatar= `/uploads/user/${req.file.originalname}`
        newUserData={...newUserData,avatar}
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators: true
    })

    res.status(200).json({
        succes:true,
        user
    })
})

//Admin: Get All users - {{baseUrl}}/api/v1/admin/users
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    })
})

//Admin: Get specific User - {{baseUrl}}/api/v1/admin/user/6596dd0c5b8ff0d007f36797
exports.getUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`user not found with this id : ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        user
    })
})

//Admin: Update User - {{baseUrl}}/api/v1/admin/user/6596dd0c5b8ff0d007f36797
exports.updateUser = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name : req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new: true,
        runValidators: false
    })

    res.status(200).json({
        succes:true,
        user
    })
})

//Admin: Delete user - {{baseUrl}}/api/v1/admin/user/6596dd0c5b8ff0d007f36797
exports.deleteUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`user not found with this id : ${req.params.id}`,404))
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        user
    })
})
