const db = require('../models');
const Place = db.Place;
const Invite = db.Invites;
const User = db.User;
const UserPlaceList = db.user_place_list;
const Op = db.Sequelize.Op;
const sendMail = require('../services/mailer.js');
const jwt = require("jsonwebtoken");
const tokenKey = 'k9zo6QGCjIWzpJ1H82yQ'

//Invite someone to his place
exports.invite = (req, res) => {
	const idToInvite = parseInt(req.params.id);
	const id = req.body.user_id

    let userFrom = null
    let userTo = null
    let place = null
    User.findByPk(id).then(uf => {
        userFrom = uf;
    })
    User.findByPk(idToInvite).then(ut => {
        userTo = ut;
    })
    Place.findByPk(req.body.place_id).then(s => {
        place = s;
    })
    const token = jwt.sign(
        {id},
        tokenKey,
        { expiresIn: '24h' }
    )
	const invite = {
        userFrom : id,
        userTo : idToInvite,
        place_id : req.body.place_id
    }
    Invite.create(invite)
        .then(data => {
            res.send(data);
            const mailOptions = {
                from: userFrom.email,
                to: userTo.email,
                subject: 'Invitation à l\'espace ' + place.name,
                html: '<p>Vous avez été invité par ' + userFrom.first_name + ' ' + userFrom.last_name + ' à rejoindre l\'espace ' + place.name + '. <a href="http://192.168.1.42:6500/api/v1/place/accept/' + data.id + '/' + token + '">Clickez ici pour le rejoindre</a>.</p>',
            };
            sendMail(mailOptions)
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


// Delete a Invite with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	Invite.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'Invite was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete Invite with id=${id}. Maybe Invite was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete place with id=' + id
			});
		});
};

// Retrieve all Invites from the database.
exports.findAll = (req, res) => {
	Invite.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving Invites.'
			});
		});
};
