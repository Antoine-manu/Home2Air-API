const express = require('express');
const router = express.Router();
const sensorController = require("../controllers/sensorController")


/* GET home page. */
// console.log('router ok')
router.get('/sensors', sensorController.getAllSensors);


module.exports = router;
