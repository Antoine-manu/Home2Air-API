const express = require('express');
const router = express.Router();
const ticketsController = require("../controllers/ticketsController")



/* POST create ticketsController. */
router.post('/ticketsController/create', ticketsController.create);

/* POST findAll ticketsController. */
router.post('/ticketsController/find-all', ticketsController.findAll);

/* POST findOne ticketsController. */
router.post('/ticketsController/find-by', ticketsController.findBy);

/* POST findOneById ticketsController. */
router.post('/ticketsController/find-one-by-id', ticketsController.findOneById);

/* POST update ticketsController. */
router.post('/ticketsController/update', ticketsController.update);

/* POST delete ticketsController. */
router.post('/ticketsController/delete', ticketsController.delete);



module.exports = router;
