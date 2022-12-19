const express = require('express');
const router = express.Router();
const placeController = require("../controllers/placeController")
const auth = require('../middleware/auth');


/* POST create place. */
router.post('/place/create', auth, placeController.create);

/* POST findAll place. */
router.post('/place/find-all', auth, placeController.findAll);

/* POST findOne place. */
router.post('/place/find-by', auth, placeController.findBy);

/* POST findOneById place. */
router.post('/place/find-one-by-id', auth, placeController.findOneById);

/* POST update place. */
router.post('/place/update', auth, placeController.update);

/* POST delete place. */
router.post('/place/delete', auth, placeController.delete);



module.exports = router;
