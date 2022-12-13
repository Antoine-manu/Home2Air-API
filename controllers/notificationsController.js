const db = require('../models');
const Notification = db.Notification;
const Op = db.Sequelize.Op;

// Create and Save a new Notification
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: 'Le rôle doit avoir un nom'
		});
		return;
	}

	// Create a Notification
	const notifications = {
		user_id: req.body.user_id,
		custom: req.body.custom,
		read: req.body.read,
		type: req.body.type,
		date: req.body.date
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

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
	notifications.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving Companiess.'
			});
		});
};

// Find Companies with condition from database
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
						err.message || 'Some error occurred while retrieving tutorials.'
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
					err.message || 'Some error occurred while retrieving Companiess.' + id
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
				message: 'Could not delete Tutorial with id=' + id
			});
		});
};
