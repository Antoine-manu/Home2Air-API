"use strict";

var express = require('express');

var router = express.Router();

var userController = require("../controllers/userController");
/* GET home page. */
// console.log('router ok')


router.get('/users', userController.getAllUsers);
module.exports = router;