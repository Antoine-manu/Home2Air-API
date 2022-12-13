const express = require('express');
const router = express.Router();
const companyController = require("../controllers/companyController")


/* POST create company. */
router.post('/company/create', companyController.create);

/* POST findAll company. */
router.post('/company/find-all', companyController.findAll);

/* POST findOneById company. */
router.post('/company/find-one-by-id', companyController.findOneById);


module.exports = router;
