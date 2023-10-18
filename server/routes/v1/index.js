const express = require("express");
const pingRoutes = require('./ping');
const paymentrequestRoutes = require('./paymentrequest');
const taskRoutes = require('./task');

const router = express.Router();

router.use('/v1/ping', pingRoutes);
router.use('/v1/paymentrequest', paymentrequestRoutes);
router.use('/v1/task', taskRoutes);


module.exports = router;