const express = require('express');
const router = express.Router();
const notificationsController = require("../controllers/notificationsController.js")
const notificationsConfigController = require("../controllers/notificationsConfigController.js")
const notificationsIconsController = require("../controllers/notificationsIconsController.js")
const notificationsSoundsController = require("../controllers/notificationsSoundController.js")
const auth = require('../middleware/auth');

/* POST create notifications. */
router.post('/notifications/create', auth, notificationsController.create);

/* POST findAll notifications. */
router.post('/notifications/find-all', auth, notificationsController.findAll);

/* POST findOne notifications. */
router.post('/notifications/find-by', auth, notificationsController.findBy);

/* POST findOneById notifications. */
router.post('/notifications/find-one-by-id', auth, notificationsController.findOneById);

/* POST update notifications. */
router.post('/notifications/update/:id', auth, notificationsController.update);

/* POST delete notifications. */
router.post('/notifications/delete', auth, notificationsController.delete);



/* POST create notifications config. */
router.post('/notifications-config/create', auth, notificationsConfigController.create);

/* POST findAll notifications config. */
router.post('/notifications-config/find-all', auth, notificationsConfigController.findAll);

/* POST findOne notifications config. */
router.post('/notifications-config/find-by', auth, notificationsConfigController.findBy);

/* POST findOneById notifications config. */
router.post('/notifications-config/find-one-by-id', auth, notificationsConfigController.findOneById);

/* POST update notifications config. */
router.post('/notifications-config/update/:id', auth, notificationsConfigController.update);

/* POST delete notifications config. */
router.post('/notifications-config/delete', auth, notificationsConfigController.delete);



/* POST create notifications Icon. */
router.post('/notifications-icons/create', auth, notificationsIconsController.create);

/* POST findAll notifications Icon. */
router.post('/notifications-icons/find-all', auth, notificationsIconsController.findAll);

/* POST findOne notifications Icon. */
router.post('/notifications-icons/find-by', auth, notificationsIconsController.findBy);

/* POST findOneById notifications Icon. */
router.post('/notifications-icons/find-one-by-id', auth, notificationsIconsController.findOneById);

/* POST update notifications Icon. */
router.post('/notifications-icons/update/:id', auth, notificationsIconsController.update);

/* POST delete notifications Icon. */
router.post('/notifications-icons/delete', auth, notificationsIconsController.delete);



/* POST create notifications sound. */
router.post('/notifications-sounds/create', auth, notificationsSoundsController.create);

/* POST findAll notifications sound. */
router.post('/notifications-sounds/find-all', auth, notificationsSoundsController.findAll);

/* POST findOne notifications sound. */
router.post('/notifications-sounds/find-by', auth, notificationsSoundsController.findBy);

/* POST findOneById notifications sound. */
router.post('/notifications-sounds/find-one-by-id', auth, notificationsSoundsController.findOneById);

/* POST update notifications sound. */
router.post('/notifications-sounds/update/:id', auth, notificationsSoundsController.update);

/* POST delete notifications sound. */
router.post('/notifications-sounds/delete', auth, notificationsSoundsController.delete);


module.exports = router;
