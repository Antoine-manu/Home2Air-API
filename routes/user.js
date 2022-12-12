const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")


/* GET home page. */
// console.log('router ok')
router.get('/users', userController.getAllUsers);


module.exports = router;
