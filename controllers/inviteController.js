const db = require('../models');
const Place = db.Place;
const Invite = db.Invites;
const UserPlaceList = db.user_place_list;
const Op = db.Sequelize.Op;

//Invite someone to his place
exports.invite = (req, res) => {
	const idToInvite = req.params.id;
	const id = req.body.user_id
	const invite = {
        userFrom : id,
        userTo : idToInvite,
        place_id : req.body.place_id
    }

    Invite.create(invite)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Invite.'
            });
        });
}
//Accept a invitation to a space
exports.accept = (req, res) => {
    id = req.params.id
    Invite.findByPk(id)
        .then(data => {
            if(data.isAccpected == true) {
                res.status(500).send({
                    message:
                         'This invitation has already been accepted'
                });
            } else {
                const list = {
                    user_id : data.userTo,
                    place_id : data.place_id
                }
                UserPlaceList.create(list)
                    .then(data => {
                        const inviteAccepted = {
                            isAccpected : true
                        }
                        Invite.update(inviteAccepted, {
                            where: { id: id }
                        })
                            .then(data => {
                                res.send(data);
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message:
                                        err.message || 'Some error occurred while updating the Invitation.'
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || 'Some error occurred while creating the PlaceList.'
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while Founding the invite.' + id
            });
        });
}
