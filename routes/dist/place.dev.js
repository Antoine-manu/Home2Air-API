"use strict";

var express = require('express');

var router = express.Router();

var placeController = require("../controllers/placeController");
/* GET home page. */
// console.log('router ok')


router.get('/', placeController.getAllPlaces);
module.exports = router;