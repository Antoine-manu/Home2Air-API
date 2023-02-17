"use strict";

var express = require('express');

var router = express.Router();

var sensorController = require("../controllers/sensorController");

var adminCheck = require('../middleware/adminCheck');

var auth = require('../middleware/auth');
/* POST create sensor. */


router.post('/sensor/create', auth, sensorController.create);
/* POST findAll sensor. */

router.post('/sensor/find-all', auth, sensorController.findAll);
/* POST findOne sensor. */

router.post('/sensor/find-by', auth, sensorController.findBy);
/* POST findOneById sensor. */

router.post('/sensor/find-one-by-id', auth, sensorController.findOneById);
/* POST update sensor. */

router.post('/sensor/update', auth, sensorController.update);
/* POST delete sensor. */

router.post('/sensor/delete', adminCheck, sensorController["delete"]);
/* POST delete sensor. */

router.post('/sensor/delete', auth, sensorController["delete"]);
module.exports = router;