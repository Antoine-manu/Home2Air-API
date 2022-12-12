const express = require('express');
const router = express.Router();
const notificationsController = require("../controllers/notificationsController.js")


/* GET home page. */
// console.log('router ok')
router.get('/notifications', notificationsController.getAllNotifications);


module.exports = router;
