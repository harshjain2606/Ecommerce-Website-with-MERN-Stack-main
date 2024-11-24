const catchAsyncError = require("../middleWares/catchAsyncError");
const orderModel = require("../models/orderModel");
const ErrorHandler = require("../errorHandler/errorHandler");
const  Product  = require("../models/productModel")


//Create New Order - api/v1/order/new
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    }=req.body;
    const order = await orderModel.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user: req.user.id
    })
    res.status(200).json({
        success:true,
        order
    })
})

//Get order - api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const order=await orderModel.findById(req.params.id).populate('user','name email');
    if(!order){
        return next(new ErrorHandler(`No Order found with  this id: ${req.params.id}`,401))
    }
    res.status(200).json({
        success:true,
        order

    })
})

//Get Loggedin User Orders - api/v1/myorders
exports.getMyOrder = catchAsyncError(async(req,res,next)=>{
    const order=await orderModel.find({user:req.user.id});
    res.status(200).json({
        success:true,
        order

    })
})

//Admin: get all Orders - api/v1/orders
exports.orders = catchAsyncError(async(req,res,next)=>{
    const orders=await orderModel.find();
    let totalAmount = 0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    })
    res.status(200).json({
        success:true,
        totalAmount,
        orders

    })
})

//Admin : Update order - api/v1/order/:id
exports.updateOrder=catchAsyncError(async(req,res,next)=>{

    const order=await orderModel.findById(req.params.id);
    if(order.orderStatus == "Delivered"){
        return next(new ErrorHandler("Order has been Delivered",400))
    }
    //Update the product stock of each order item
    order.orderItems.forEach(async orderItem=>{
        await updateStock(orderItem.product,orderItem.quantity)
    })

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt=Date.now();
    await order.save({validateBeforeSave:false})
    res.status(200).json(
        {success:true
        })

})

async function updateStock(proId,qty){
    const product =await Product.findById(proId)
    product.stock = product.stock-qty;
    product.save({validateBeforeSave:false})

}

//Admin : Delete Order - api/v1/order 
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order=await orderModel.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`No Order found with  this id: ${req.params.id}`,401))
    }
    await orderModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true

    })
})