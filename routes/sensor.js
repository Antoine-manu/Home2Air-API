const express = require('express');
const router = express.Router();
const sensorController = require("../controllers/sensorController")



/* POST create sensor. */
router.post('/sensor/create', sensorController.create);

/* POST findAll sensor. */
router.post('/sensor/find-all', sensorController.findAll);

/* POST findOne sensor. */
router.post('/sensor/find-by', sensorController.findBy);

/* POST findOneById sensor. */
router.post('/sensor/find-one-by-id', sensorController.findOneById);

/* POST update sensor. */
router.post('/sensor/update', sensorController.update);

/* POST delete sensor. */
router.post('/sensor/delete', sensorController.delete);



module.exports = router;
