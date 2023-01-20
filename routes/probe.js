const express = require('express');
const router = express.Router();
const request = require('request');
const probeController = require('../controllers/probeController');
const adminCheck = require('../middleware/adminCheck');
const auth = require('../middleware/auth');

router.get('/probe', auth, probeController.getStreamData);

module.exports = router;
