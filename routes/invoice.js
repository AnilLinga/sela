
'use strict';

var express = require('express');
var controller = require('../controllers/invoiceController');

var router = express.Router();

router.get('/search',controller.getData)
router.post('/create',controller.addData)


module.exports = router;