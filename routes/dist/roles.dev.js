"use strict";

var express = require('express');

var router = express.Router();

var rolesController = require("../controllers/rolesController");

var auth = require('../middleware/auth');
/* POST create roles. */


router.post('/roles/create', rolesController.create);
/* POST findAll roles. */

router.post('/roles/find-all', auth, rolesController.findAll);
/* POST findOne roles. */

router.post('/roles/find-by', auth, rolesController.findBy);
/* POST findOneById roles. */

router.post('/roles/find-one-by-id', auth, rolesController.findOneById);
/* POST update roles. */

router.post('/roles/update/:id', auth, rolesController.update);
/* POST delete roles. */

router.post('/roles/delete', auth, rolesController["delete"]);
module.exports = router;