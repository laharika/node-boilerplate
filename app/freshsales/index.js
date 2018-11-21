'use strict';

let express = require('express');
let router = express.Router();
let FreshSalesController = require('./controller/FreshSalesController')

router.get('/test', FreshSalesController.test);

module.exports = router;
