const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middleware/auth');


/* POST create user. */
router.post('/user/create', userController.create);

/* POST findAll user. */
router.post('/user/find-all', auth, userController.findAll);

/* POST findOne user. */
router.post('/user/find-by', auth, userController.findBy);

/* POST findOneById user. */
router.post('/user/find-one-by-id', auth, userController.findOneById);

/* POST update user. */
router.post('/user/update/:id', auth, userController.update);

/* POST delete user. */
router.post('/user/delete', auth, userController.delete);


module.exports = router;
