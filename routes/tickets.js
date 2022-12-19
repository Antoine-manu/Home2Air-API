const express = require('express');
const router = express.Router();
const ticketsController = require("../controllers/ticketsController")
const auth = require('../middleware/auth');


/* POST create ticketsController. */
router.post('/ticketsController/create', auth, ticketsController.create);

/* POST findAll ticketsController. */
router.post('/ticketsController/find-all', auth, ticketsController.findAll);

/* POST findOne ticketsController. */
router.post('/ticketsController/find-by', auth, ticketsController.findBy);

/* POST findOneById ticketsController. */
router.post('/ticketsController/find-one-by-id', auth, ticketsController.findOneById);

/* POST update ticketsController. */
router.post('/ticketsController/update', auth, ticketsController.update);

/* POST delete ticketsController. */
router.post('/ticketsController/delete', auth, ticketsController.delete);



module.exports = router;
