const db = require('../models');
const notifType = db.notification_types;
const Op = db.Sequelize.Op;

// Create and Save a new notifType
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: 'Le type de notification doit avoir un nom'
		});
		return;
	}

	// Create a notification_types
	const notification_types = {
		name: req.body.name
	};
	console.log(notifType);
	// Save notification_types in the database
	notifType.create(notification_types)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the notification_types.'
			});
		});
};

// Retrieve all notification type from the database.
exports.findAll = (req, res) => {
	notifType.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving notification types.'
			});
		});
};

// Find notification type with condition from database
exports.findBy = (req, res) => {
	const name = req.body.name;

	var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
	console.log(condition);
	if (condition) {
		notifType.findAll({ where: condition })
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while retrieving notification types.'
				});
			});
	} else {
		res.status(500).send({
			message: 'No params found'
		});
	}
};

// Find a single notifType with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	notifType.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find notifType with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving notification types.' + id
			});
		});
};

// Update a notifType by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	notifType.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'notifType was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update notifType with id=${id}. Maybe notifType was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating notifType with id=' + id
			});
		});
};

// Delete a notifType with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	notifType.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'notifType was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete notifType with id=${id}. Maybe notifType was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete notification type with id=' + id
			});
		});
};
