const express = require('express');
const router = express.Router();
const ticketsController = require("../controllers/ticketsController")


/* GET home page. */
// console.log('router ok')
router.get('/tickets', ticketsController.getAllTickets);


module.exports = router;
