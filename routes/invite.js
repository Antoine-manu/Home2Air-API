const inviteController = require("../controllers/inviteController");
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();



/* POST invite user in space. */
router.post('/place/invite/:id', auth, inviteController.invite);

/* POST accept invites. */
router.get('/place/accept/:id/:token', auth, inviteController.accept);

/* POST delete invite. */
router.post('/invite/delete', auth, inviteController.delete);

/* POST findAll invites. */
router.post('/invite/find-all', auth, inviteController.findAll);


module.exports = router;
