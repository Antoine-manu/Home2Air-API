"use strict";

var express = require('express');

var router = express.Router();

var roomController = require("../controllers/roomController");
/* POST create room. */


router.post('/room/create', roomController.create);
/* POST findAll room. */

router.post('/room/find-all', roomController.findAll);
/* POST findOne room. */

router.post('/room/find-by', roomController.findBy);
/* POST findOneById room. */

router.post('/room/find-one-by-id', roomController.findOneById);
/* POST update room. */

router.post('/room/update', roomController.update);
/* POST delete room. */

router.post('/room/delete', roomController["delete"]);
module.exports = router;