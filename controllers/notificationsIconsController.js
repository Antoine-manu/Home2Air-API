const db = require('../models');
const NotificationIcon = db.Notifications_icon;
const Op = db.Sequelize.Op;
// Create and Save a new NotificationIcon
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: "L'icon doit avoir un nom"
		});
		return;
	}

	// Create a NotificationIcon
	const notifIcon = {
		name: req.body.name
	};
	// Save NotificationIcon in the database
	NotificationIcon.create(notifIcon)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Notification Icon.'
			});
		});
};

// Retrieve all Notification icon from the database.
exports.findAll = (req, res) => {
	console.log(NotificationIcon)
	NotificationIcon.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving Notification icon.'
			});
		});
};

// Find Notification icon with condition from database
exports.findBy = (req, res) => {
	const name = req.body.name;

	var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
	console.log(condition);
	if (condition) {
		NotificationIcon.findAll({ where: condition })
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while retrieving notification icons.'
				});
			});
	} else {
		res.status(500).send({
			message: 'No params found'
		});
	}
};

// Find a single NotificationIcon with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	NotificationIcon.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find NotificationIcon with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving Notification icon.' + id
			});
		});
};

// Update a NotificationIcon by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	NotificationIcon.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'NotificationIcon was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update NotificationIcon with id=${id}. Maybe NotificationIcon was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating NotificationIcon with id=' + id
			});
		});
};

// Delete a NotificationIcon with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	NotificationIcon.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'NotificationIcon was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete NotificationIcon with id=${id}. Maybe NotificationIcon was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete Tutorial with id=' + id
			});
		});
};
