const express = require('express');
const router = express.Router();
const companyController = require("../controllers/companyController")


/* GET home page. */
// console.log('router ok')
router.get('/', companyController.getAllCompanies);


module.exports = router;
