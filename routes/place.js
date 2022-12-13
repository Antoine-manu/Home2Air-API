const express = require('express');
const router = express.Router();
const placeController = require("../controllers/placeController")



/* POST create place. */
router.post('/place/create', placeController.create);

/* POST findAll place. */
router.post('/place/find-all', placeController.findAll);

/* POST findOne place. */
router.post('/place/find-by', placeController.findBy);

/* POST findOneById place. */
router.post('/place/find-one-by-id', placeController.findOneById);

/* POST update place. */
router.post('/place/update', placeController.update);

/* POST delete place. */
router.post('/place/delete', placeController.delete);



module.exports = router;
