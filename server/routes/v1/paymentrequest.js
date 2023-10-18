const express = require("express");

const router = express.Router();

const commonController = require('../../controllers/commonController');
const paymentrequestController = require('../../controllers/v1/paymentrequestController');

router.route('/all')
    .get(paymentrequestController.getpaymentrequest)
    .all(commonController.methodNotAllowed);

// router.route('/add')
//     .post(paymentrequestController.addPaymentRequest)
//     .all(commonController.methodNotAllowed);    

// router.route('/:id')
//     .get(paymentrequestController.getPaymentRequestById)
//     .all(commonController.methodNotAllowed);

// router.route('/update/:id')
//     .post(paymentrequestController.updatePaymentRequestById)
//     .all(commonController.methodNotAllowed);   

// router.route('/delete/:id')
//     .post(paymentrequestController.deletePaymentRequest)
//     .all(commonController.methodNotAllowed);

// router.route('/')
//     .get(paymentrequestController.downloadRequests)
//     .all(commonController.methodNotAllowed);

module.exports = router;