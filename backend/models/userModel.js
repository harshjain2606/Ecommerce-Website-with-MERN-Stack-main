const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')



const userSchemas =new mongoose.Schema({
    name : {
        type: String,
        required : [true , "Please enter name"],
    },
    email:{
        type: String,
        required : [true , "Please enter email"],
        unique: true,
        validate: [validator.isEmail,"Please enter valid email"],
        
    },
    password:{
        type: String,
        required: [true, "Please enter password"],
        minLength: [7,"Password need to exceed 7 charactors"],
        select:false
    },
    avatar:{
        type: String
    },
    role:{
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    created :{
        type: Date,
        default: Date.now
    }

})

userSchemas.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchemas.methods.getJwToken=function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

userSchemas.methods.isValidPassword=async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
    
}

userSchemas.methods.getResetToken=function(){
    //generate Token
    const token = crypto.randomBytes(20).toString('hex')
    
    //generate hash and set to resetPassword Token
    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex')
    console.log(this.resetPasswordToken)
    //set token expire time
    this.resetPasswordTokenExpire=Date.now()+60*60*1000;
    
    return token
}

let model = mongoose.model("User",userSchemas);

module.exports=model