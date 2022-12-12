const express = require('express');
const router = express.Router();
const rolesController = require("../controllers/rolesController")


/* GET home page. */
// console.log('router ok')
router.get('/roles', rolesController.getAllRoles);


module.exports = router;
