const express = require('express');
const router = express.Router();
const probeController = require('../controllers/probeController')

router.get('/probe', probeController.dataConsolidation);

module.exports = router;
