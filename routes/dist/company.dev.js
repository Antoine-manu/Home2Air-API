"use strict";

var express = require('express');

var router = express.Router();

var companyController = require("../controllers/companyController");
/* GET home page. */
// console.log('router ok')


router.get('/', companyController.getAllCompanies);
module.exports = router;