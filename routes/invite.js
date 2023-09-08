const inviteController = require("../controllers/inviteController");
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();



/* POST invite user in space. */
router.post('/place/invite', auth, inviteController.invite);

/* POST accept invites. */
router.post('/invite/accept', auth, inviteController.accept);

/* POST delete invite. */
router.post('/invite/delete', auth, inviteController.delete);

/* POST delete invite. */
router.post('/invite/find-by-user', auth, inviteController.findByUser);

/* POST delete invite. */
router.post('/invite/find-by-id', auth, inviteController.findById);

/* POST findAll invites. */
router.post('/invite/find-all', auth, inviteController.findAll);


module.exports = router;
