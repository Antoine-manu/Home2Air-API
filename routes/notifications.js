const express = require('express');
const router = express.Router();
const notificationsController = require("../controllers/notificationsController.js")
const auth = require('../middleware/auth');

/* GET home page. */
// console.log('router ok')

/* POST create notifications. */
router.post('/notifications/create', auth, notificationsController.create);

/* POST findAll notifications. */
router.post('/notifications/find-all', auth, notificationsController.findAll);

/* POST findOne notifications. */
router.post('/notifications/find-by', auth, notificationsController.findBy);

/* POST findOneById notifications. */
router.post('/notifications/find-one-by-id', auth, notificationsController.findOneById);

/* POST update notifications. */
router.post('/notifications/update', auth, notificationsController.update);

/* POST delete notifications. */
router.post('/notifications/delete', auth, notificationsController.delete);


module.exports = router;
