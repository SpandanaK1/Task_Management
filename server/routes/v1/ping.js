const express = require("express");

const router = express.Router();

const commonController = require('../../controllers/commonController');
const pingController = require('../../controllers/v1/pingController');

router.route('/')
    .get(pingController.getAppStatus)
    .all(commonController.methodNotAllowed);


router.route('/db')
    .get(pingController.getDbStatus)
    .all(commonController.methodNotAllowed);


module.exports = router;