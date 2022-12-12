const express = require('express');
const router = express.Router();
const placeController = require("../controllers/placeController")


/* GET home page. */
// console.log('router ok')
router.get('/', placeController.getAllPlaces);


module.exports = router;
