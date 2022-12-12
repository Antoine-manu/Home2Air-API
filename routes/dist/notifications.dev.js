"use strict";

var express = require('express');

var router = express.Router();

var notificationsController = require("../controllers/notificationsController");
/* GET home page. */
// console.log('router ok')


router.get('/', notificationsController.getAllNotifications);
module.exports = router;