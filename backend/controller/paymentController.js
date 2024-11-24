const catchAsyncError = require('../middleWares/catchAsyncError')
exports.processPayment = catchAsyncError(async(req,res,next) =>{
    console.log(process.env.STRIPE_SECRET_KEY)
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'ind',
        description: 'TEST PAYMENT',
        metadata: { integration_check: 'accept_payment' },
        shipping: req.body.shipping
    })
    console.log("fsseds")
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

exports.sendStripeApi = catchAsyncError(async(req,res,next) =>{
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})