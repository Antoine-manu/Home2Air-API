const inviteController = require("../controllers/inviteController");
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController")



/* POST invite user in space. */
router.post('/place/invite/:id', auth, inviteController.invite);

/* POST accept invites. */
router.post('/place/accept/:id', auth, inviteController.accept);



module.exports = router;
