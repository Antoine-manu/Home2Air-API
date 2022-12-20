const express = require('express');
const router = express.Router();
const roomController = require("../controllers/roomController");
const auth = require('../middleware/auth');


/* POST create room. */
router.post('/room/create', auth, roomController.create);

/* POST findAll room. */
router.post('/room/find-all', auth, roomController.findAll);

/* POST findOne room. */
router.post('/room/find-by', auth, roomController.findBy);

/* POST findOneById room. */
router.post('/room/find-one-by-id', auth, roomController.findOneById);

/* POST update room. */
router.post('/room/update/:id', auth, roomController.update);

/* POST delete room. */
router.post('/room/delete', auth, roomController.delete);



module.exports = router;
