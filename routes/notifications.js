const express = require('express');
const router = express.Router();
const notificationsController = require("../controllers/notificationsController")


/* GET home page. */
// console.log('router ok')
router.get('/', notificationsController.getAllNotifications);


module.exports = router;
