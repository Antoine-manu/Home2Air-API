const db = require('../models');
const Notification = db.Notifications;
const NotificationsConfig = db.Notifications_config;
const Op = db.Sequelize.Op;

// Create and Save a new Notification
exports.create = (req, res) => {
	// Validate request
	if (!req.body.config) {
		res.status(400).send({
			message: 'La notification doit avoir une configuration'
		});
		return;
	}
	NotificationsConfig.findByPk(req.body.config)
	.then(data => {
		// Create a Notification
		console.log(data)
		const notifications = {
			user_id: data.user_id,
			custom: data.custom,
			read: false,
			type: data.type,
			title: data.title,
			date: data.date,
			message: data.message,
			icon_id: data.icon_id,
			sound_id: data.sound_id
		};
		console.log(Notification);
		// Save Notification in the database
		Notification.create(notifications)
			.then(data => {
				res.send(data);
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
				err.message || 'Some error occurred while getting the Notification config.'
		});
	});
};

// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {
	notification.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving Notifications.'
			});
		});
};

// Find Notifications with condition from database
exports.findBy = (req, res) => {
	const id = req.body.value;

	var condition =  { user_id: { [Op.like]: `%${id}%` } } ;
	if (condition) {
		Notification.findAll({ where: condition })
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while retrieving notifications.'
				});
			});
	} else {
		res.status(500).send({
			message: 'No params found'
		});
	}
};

// Find a single notifications with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	Notification.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find notifications with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving Notifications.' + id
			});
		});
};

// Update a notifications by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Notification.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'notifications was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update notifications with id=${id}. Maybe notifications was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating notifications with id=' + id
			});
		});
};

// Delete a notifications with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	Notification.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'notifications was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete notifications with id=${id}. Maybe notifications was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete Notification with id=' + id
			});
		});
};
