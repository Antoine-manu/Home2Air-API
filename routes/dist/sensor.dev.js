"use strict";

var express = require('express');

var router = express.Router();

var sensorController = require("../controllers/sensorController");
/* GET home page. */
// console.log('router ok')


router.get('/sensors', sensorController.getAllSensors);
module.exports = router;