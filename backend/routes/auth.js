const express = require('express')
const multer = require('multer')
const path = require('path')

const upload = multer({storage:multer.diskStorage({
        destination:function(req,file,cb){
                cb(null,path.join(__dirname,'..','uploads/user'))
        },
        filename:function(req,file,cb){
                cb(null,file.originalname)
        }
})})

const { registerUSer, 
        loginUser, 
        logoutUser, 
        forgotPassword, 
        resetPassword,
        getUserProfile, 
        changePassword,
        updateProfile,
        getAllUsers,
        getUser,
        updateUser,
        deleteUser} = require('../controller/authController')
const router = express.Router()
const { isAuthenticateUser, aunthorizeRole } = require('../middleWares/authenticate');


router.route('/register').post(upload.single('avatar'),registerUSer);
router.route('/login').post(loginUser); 
router.route('/logout').get(logoutUser); 
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);  
router.route('/myprofile').get(isAuthenticateUser,getUserProfile); 
router.route('/password/change').put(isAuthenticateUser,changePassword); 
router.route('/update').put(isAuthenticateUser,upload.single('avatar'),updateProfile);

//Admin Routes
router.route('/admin/users').get(isAuthenticateUser,aunthorizeRole('admin'),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticateUser,aunthorizeRole('admin'),getUser)
                                .put(isAuthenticateUser,aunthorizeRole('admin'),updateUser)
                                .delete(isAuthenticateUser,aunthorizeRole('admin'),deleteUser)


module.exports=router;