const inviteController = require("../controllers/inviteController");
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController")



/* POST invite user in space. */
router.post('/place/invite/:id', auth, inviteController.invite);

/* POST accept invites. */
router.post('/place/accept/:id', auth, inviteController.accept);

/* POST delete invite. */
router.post('/invite/delete', auth, inviteController.delete);

/* POST findAll invites. */
router.post('/invite/find-all', auth, inviteController.findAll);


module.exports = router;
