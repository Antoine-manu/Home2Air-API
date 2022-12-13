const express = require('express');
const router = express.Router();
const companyController = require("../controllers/companyController")


/* GET home page. */
router.post('/company/create', companyController.create);


module.exports = router;
