const express = require('express');
const router = express.Router();
const companyController = require("../controllers/companyController")
const auth = require('../middleware/auth');

/* POST create company. */
router.post('/company/create', auth, companyController.create);

/* POST findAll company. */
router.post('/company/find-all', auth, companyController.findAll);

/* POST findOne company. */
router.post('/company/find-by', auth, companyController.findBy);

/* POST findOneById company. */
router.post('/company/find-one-by-id', auth, companyController.findOneById);

/* POST update company. */
router.post('/company/update', auth, companyController.update);

/* POST delete company. */
router.post('/company/delete', auth, companyController.delete);


module.exports = router;
