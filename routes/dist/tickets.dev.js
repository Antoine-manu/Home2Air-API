"use strict";

var express = require('express');

var router = express.Router();

var ticketsController = require("../controllers/ticketsController");
/* GET home page. */
// console.log('router ok')


router.get('/', ticketsController.getAllTickets);
module.exports = router;