const inviteController = require("../controllers/inviteController");
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();



/* POST invite user in space. */
router.post('/place/invite', auth, inviteController.invite);

/* POST accept invites. */
router.get('/place/accept/:id/:token', auth, inviteController.accept);

/* POST delete invite. */
router.post('/invite/delete', auth, inviteController.delete);

/* POST delete invite. */
router.post('/invite/find-by-user', inviteController.findByUser);

/* POST delete invite. */
router.get('/invite/find-by-id/:id', auth, inviteController.findById);

/* POST findAll invites. */
router.post('/invite/find-all', auth, inviteController.findAll);


module.exports = router;
