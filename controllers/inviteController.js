const db = require('../models');
const Invite = db.Invites;
const User = db.User;
const Place = db.Place;
const UserPlaceList = db.user_place_list;
const Notification = db.Notifications;
const sendMail = require('../services/mailer.js');
const jwt = require("jsonwebtoken");
const tokenKey = 'k9zo6QGCjIWzpJ1H82yQ'
const Op = db.Sequelize.Op;

//Invite someone to his place
exports.invite = (req, res) => {
	const idToInvite = parseInt(req.body.userTo_id);
	const place_id = req.body.place_id
    const userID = req.body.user_id

    let userFrom = null
    let userTo = null
    let place = null
    User.findByPk(userID).then(uf => {
        userFrom = uf;
    })
    User.findByPk(idToInvite).then(ut => {
        userTo = ut;
    })
    Place.findByPk(place_id).then(s => {
        place = s;
    })
    const token = jwt.sign(
        {userID},
        tokenKey,
        { expiresIn: '24h' }
    )
	const invite = {
        userFrom : userID,
        userTo : idToInvite,
        place_id : req.body.place_id
    }
    const condition = { place_id: invite.place_id, userTo : invite.userTo };
    Invite.findAll({where: {[Op.and] : condition}})
        .then(data => {
            console.log("_____________________", data, data != [])
            if(data.length > 0){
                res.send(data);
            } else {
                Invite.create(invite)
                    .then(data => {
                        const invite = data
                        const mailOptions = {
                            from: userFrom.email,
                            to: userTo.email,
                            subject: 'Invitation à l\'espace ' + place.name,
                            html: '<p>Vous avez été invité par ' + userFrom.first_name + ' ' + userFrom.last_name + ' à rejoindre l\'espace ' + place.name + '. <a href="http://192.168.1.42:6500/api/v1/place/accept/' + data.id + '/' + token + '">Clickez ici pour le rejoindre</a>.</p>',
                        };
                        sendMail(mailOptions)

                        //Envoie email a l'invité
                        const notifications = {
                            user_id: userTo.id,
                            custom: false,
                            read: false,
                            title: "Vous avez été invité a l'espace " + place.name + " par " + userFrom.first_name + " " + userFrom.last_name + ", consultez vos mail pour en savoir plus.",
                            date: new Date(),
                            message: "",
                        };
                        // Save Notification in the database
                        Notification.create(notifications)
                            .then(data => {
                                res.send(invite);
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message:
                                        err.message || 'Some error occurred while creating the Notification.'
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || 'Some error occurred while creating the Invite.'
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Invite.'
            });
        });
}

//Accept a invitation to a space
exports.accept = (req, res) => {
    id = req.params.id
    Invite.findByPk(id, {include : ["From", "To", "Place"]})
        .then(data => {
            invite = data
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
                            where: { id: id },
                        })
                            .then(data => {
                                //Envoie email a l'invité
                                const notifications = {
                                    user_id: invite.userFrom,
                                    custom: false,
                                    read: false,
                                    title: invite.To.first_name + " " + invite.To.last_name + " à accepté votre invitation a l'espace " + invite.Place.name + ".",
                                    date: new Date(),
                                    message: "",
                                };
                                // Save Notification in the database
                                Notification.create(notifications)
                                    .then(data => {
                                        res.send(invite);
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            message:
                                                err.message || 'Some error occurred while creating the Notification.'
                                        });
                                    });
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

// Retrieve all Invites from the database.
exports.findByUser = (req, res) => {
    const id = req.body.id;
    const condition = { place_id: id };
	Invite.findAll({where: condition})
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
