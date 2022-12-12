const express = require('express');
const router = express.Router();
const roomController = require("../controllers/roomController")


/* GET home page. */
// console.log('router ok')
router.get('/rooms', roomController.getAllRooms);


module.exports = router;
