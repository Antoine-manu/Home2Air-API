"use strict";

var express = require('express');

var router = express.Router();

var mainController = require("../controllers/mainController");
/* GET home page. */
// console.log('router ok')


router.get('/sensor', mainController.getHome);
module.exports = router;