"use strict";

var express = require('express');

var router = express.Router();

var placeController = require('../controllers/placeController');

var auth = require('../middleware/auth');
/* POST create place. */


router.post('/place/create', auth, placeController.create);
/* POST findAll place. */

router.post('/place/find-all', auth, placeController.findAll);
router.post('/place/find-room-and-sensor', auth, placeController.findAllRoomsAndSensorFromPlaceById);
/* POST findOne place. */

router.post('/place/find-by', auth, placeController.findBy);
/* POST findOneById place. */

router.post('/place/find-one-by-id', auth, placeController.findOneById);
/* POST update place. */

router.post('/place/update/:id', auth, placeController.update);
/* POST delete place. */

router.post('/place/delete', auth, placeController["delete"]);
/* POST delete place. */
// router.post('/place/join', auth, placeController.join);

module.exports = router;