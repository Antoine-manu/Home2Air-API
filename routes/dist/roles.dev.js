"use strict";

var express = require('express');

var router = express.Router();

var rolesController = require("../controllers/rolesController");
/* GET home page. */
// console.log('router ok')


router.get('/', rolesController.getAllRoles);
module.exports = router;