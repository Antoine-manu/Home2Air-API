const express = require('express');
const router = express.Router();
const mainController = require("../controllers/mainController")


/* GET home page. */
// console.log('router ok')
router.get('/sensor', mainController.getHome);


module.exports = router;
