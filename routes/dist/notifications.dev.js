"use strict";

var express = require('express');

var router = express.Router();

var notificationsController = require("../controllers/notificationsController.js");
/* GET home page. */
// console.log('router ok')

/* POST create notifications. */


router.post('/notifications/create', notificationsController.create);
/* POST findAll notifications. */

router.post('/notifications/find-all', notificationsController.findAll);
/* POST findOne notifications. */

router.post('/notifications/find-by', notificationsController.findBy);
/* POST findOneById notifications. */

router.post('/notifications/find-one-by-id', notificationsController.findOneById);
/* POST update notifications. */

router.post('/notifications/update', notificationsController.update);
/* POST delete notifications. */

router.post('/notifications/delete', notificationsController["delete"]);
module.exports = router;