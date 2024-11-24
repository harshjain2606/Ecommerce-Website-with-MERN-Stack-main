const express = require('express');
const { isAuthenticateUser } = require('../middleWares/authenticate');
const { processPayment, sendStripeApi } = require('../controller/paymentController');
const router = express.Router()

router.route('/payment/process').post(isAuthenticateUser, processPayment);
router.route('/stripeapi').get(isAuthenticateUser,sendStripeApi);

module.exports = router