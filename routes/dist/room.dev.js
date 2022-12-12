"use strict";

var express = require('express');

var router = express.Router();

var roomController = require("../controllers/roomController");
/* GET home page. */
// console.log('router ok')


router.get('/', roomController.getAllRooms);
module.exports = router;