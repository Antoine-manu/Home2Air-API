"use strict";

var express = require('express');

var router = express.Router();

var rolesController = require("../controllers/rolesController");
/* POST create roles. */


router.post('/roles/create', rolesController.create);
/* POST findAll roles. */

router.post('/roles/find-all', rolesController.findAll);
/* POST findOne roles. */

router.post('/roles/find-by', rolesController.findBy);
/* POST findOneById roles. */

router.post('/roles/find-one-by-id', rolesController.findOneById);
/* POST update roles. */

router.post('/roles/update', rolesController.update);
/* POST delete roles. */

router.post('/roles/delete', rolesController["delete"]);
module.exports = router;