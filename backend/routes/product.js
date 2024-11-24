const express = require('express')
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts, update, newProd } = require('../controller/productController');
const { isAuthenticateUser, aunthorizeRole } = require('../middleWares/authenticate');
const router = express.Router()
const multer = require('multer')
const path = require('path')


const upload = multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
            cb(null,path.join(__dirname,'..','uploads/product'))
    },
    filename:function(req,file,cb){
            cb(null,file.originalname)
    }
})})

router.route('/products').get(getProducts);

router.route('/products/:id').get(getSingleProduct)
                             
router.route('/review').put(isAuthenticateUser,createReview)
                        .delete(deleteReview)
                        


//Admin Routes
router.route('/admin/products/new').post(isAuthenticateUser,aunthorizeRole("admin"),upload.array('images'),newProduct);
router.route('/admin/products').get(isAuthenticateUser,aunthorizeRole("admin"),getAdminProducts);
router.route('/admin/products/:id').delete(isAuthenticateUser,aunthorizeRole("admin"),deleteProduct);
router.route('/admin/products/:id').put(isAuthenticateUser,aunthorizeRole("admin"),upload.array('images'),updateProduct);
router.route('/admin/reviews').get(isAuthenticateUser,aunthorizeRole("admin"),getReviews)
router.route('/admin/review').delete(isAuthenticateUser,aunthorizeRole("admin"),deleteReview)

module.exports=router