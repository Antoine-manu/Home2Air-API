"use strict";

var express = require('express');

var router = express.Router();

var userController = require("../controllers/userController");
/* POST create user. */


router.post('/user/create', userController.create);
/* POST findAll user. */

router.post('/user/find-all', userController.findAll);
/* POST findOne user. */

router.post('/user/find-by', userController.findBy);
/* POST findOneById user. */

router.post('/user/find-one-by-id', userController.findOneById);
/* POST update user. */

router.post('/user/update', userController.update);
/* POST delete user. */

router.post('/user/delete', userController["delete"]);
module.exports = router;