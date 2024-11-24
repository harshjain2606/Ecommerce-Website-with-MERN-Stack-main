const express = require('express')
const  {isAuthenticateUser, aunthorizeRole } = require('../middleWares/authenticate')
const { newOrder, getSingleOrder, getMyOrder, orders, updateOrder, deleteOrder } = require('../controller/orderCOntroller')
const router = express.Router()

router.route('/order/new').post(isAuthenticateUser,newOrder)
router.route('/order/:id').get(isAuthenticateUser,getSingleOrder)
router.route('/myorders').get(isAuthenticateUser,getMyOrder)

//Admin Route
router.route('/admin/orders').get(isAuthenticateUser,aunthorizeRole('admin'),orders)
router.route('/admin/order/:id').put(isAuthenticateUser,aunthorizeRole('admin'),updateOrder)
                          .delete(isAuthenticateUser,aunthorizeRole('admin'),deleteOrder)


module.exports=router