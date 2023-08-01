"use strict";

var express = require('express');

var router = express.Router();

var notificationsController = require("../controllers/notificationsController.js");

var notificationsConfigController = require("../controllers/notificationsConfigController.js");

var notificationsMessagesController = require("../controllers/notificationsMessagesController.js");

var auth = require('../middleware/auth');
/* POST create notifications. */


router.post('/notifications/create', auth, notificationsController.create);
/* POST findAll notifications. */

router.post('/notifications/find-all', auth, notificationsController.findAll);
/* POST notifications passed. */

router.post('/notifications/find-passed', auth, notificationsController.findPassed);
/* POST notifications passed. */

router.post('/notifications/find-recent', auth, notificationsController.findRecent);
/* POST findOne notifications. */

router.post('/notifications/find-by', auth, notificationsController.findBy);
/* POST findOneById notifications. */

router.post('/notifications/find-one-by-id', auth, notificationsController.findOneById);
/* POST update notifications. */

router.post('/notifications/update/:id', auth, notificationsController.update);
/* POST delete notifications. */

router.post('/notifications/delete', auth, notificationsController["delete"]);
/* POST create notifications config. */

router.post('/notifications-config/create', auth, notificationsConfigController.create);
/* POST findAll notifications config. */

router.post('/notifications-config/find-all', auth, notificationsConfigController.findAll);
/* POST findOne notifications config. */

router.post('/notifications-config/find-by', auth, notificationsConfigController.findBy);
router.post('/notifications-config/find-user-config', auth, notificationsConfigController.findUserConfigs);
/* POST findOneById notifications config. */

router.post('/notifications-config/find-one-by-id', auth, notificationsConfigController.findOneById);
/* POST update notifications config. */

router.post('/notifications-config/update/:id', auth, notificationsConfigController.update);
/* POST delete notifications config. */

router.post('/notifications-config/delete', auth, notificationsConfigController["delete"]);
/* POST create notifications message. */

router.post('/notifications/messages/create', auth, notificationsMessagesController.create);
/* POST findAll notifications message. */

router.post('/notifications/messages/find-all', auth, notificationsMessagesController.findAll);
/* POST findOne notifications message. */

router.post('/notifications/messages/find-by', auth, notificationsMessagesController.findBy);
/* POST findOneById notifications message. */

router.post('/notifications/messages/find-one-by-id', auth, notificationsMessagesController.findOneById);
/* POST update notifications message. */

router.post('/notifications/messages/update/:id', auth, notificationsMessagesController.update);
/* POST delete notifications message. */

router.post('/notifications/messages/delete', auth, notificationsMessagesController["delete"]);
module.exports = router;