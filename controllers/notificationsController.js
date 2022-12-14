const db = require('../models');
const Notification = db.Notification;
const Op = db.Sequelize.Op;

// Create and Save a new Notification
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title) {
		res.status(400).send({
			message: 'La notification doit avoir un titre'
		});
		return;
	}
	if (!req.body.message) {
		res.status(400).send({
			message: 'La notification doit avoir un message'
		});
		return;
	}
	if (!req.body.date) {
		res.status(400).send({
			message: 'La notification doit avoir une écheance'
		});
		return;
	}

	// Create a Notification
	const notifications = {
		user_id: req.body.user_id,
		custom: req.body.custom,
		read: false,
		type: req.body.type,
		title: req.body.title,
		date: req.body.date,
		message: req.body.message,
		icon_id: req.body.icon_id,
		sound_id: req.body.sound_id
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
};

// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {
	notifications.findAll()
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
	const name = req.body.name;

	var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
	console.log(condition);
	if (condition) {
		Notifications.findAll({ where: condition })
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

	Notifications.findByPk(id)
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

	Notifications.update(req.body, {
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

	Notifications.destroy({
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
