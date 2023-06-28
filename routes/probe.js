const express = require('express');
const router = express.Router();
const probeController = require('../controllers/probeController')

router.post('/probe', probeController.dataConsolidation);

module.exports = router;
