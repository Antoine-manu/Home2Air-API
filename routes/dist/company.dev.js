"use strict";

var express = require('express');

var router = express.Router();

var companyController = require("../controllers/companyController");
/* POST create company. */


router.post('/company/create', companyController.create);
/* POST findAll company. */

router.post('/company/find-all', companyController.findAll);
/* POST findOne company. */

router.post('/company/find-by', companyController.findBy);
/* POST findOneById company. */

router.post('/company/find-one-by-id', companyController.findOneById);
/* POST update company. */

router.post('/company/update', companyController.update);
/* POST delete company. */

router.post('/company/delete', companyController["delete"]);
module.exports = router;