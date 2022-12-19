const express = require('express');
const router = express.Router();
const rolesController = require("../controllers/rolesController");
const adminCheck = require('../middleware/auth');
const auth = require('../middleware/auth');


/* POST create roles. */
router.post('/roles/create', auth, rolesController.create);

/* POST findAll roles. */
router.post('/roles/find-all', auth, rolesController.findAll);

/* POST findOne roles. */
router.post('/roles/find-by', auth, rolesController.findBy);

/* POST findOneById roles. */
router.post('/roles/find-one-by-id', auth, rolesController.findOneById);

/* POST update roles. */
router.post('/roles/update', auth, rolesController.update);

/* POST delete roles. */
router.post('/roles/delete', auth, rolesController.delete);



module.exports = router;
