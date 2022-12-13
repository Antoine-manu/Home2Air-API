const db = require('../models');
const NotificationMsg = db.NotificationMsg_messages;
const Op = db.Sequelize.Op;

// Create and Save a new NotificationMsg
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: 'Le rôle doit avoir un nom'
		});
		return;
	}

	// Create a NotificationMsg
	const notifMsg = {
		name: req.body.name
	};
	console.log(NotificationMsg);
	// Save NotificationMsg in the database
	NotificationMsg.create(notifMsg)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the NotificationMsg.'
			});
		});
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
	NotificationMsg.findAll()
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
		NotificationMsg.findAll({ where: condition })
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

// Find a single NotificationMsg with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	NotificationMsg.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find NotificationMsg with id=${id}.`
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

// Update a NotificationMsg by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	NotificationMsg.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'NotificationMsg was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update NotificationMsg with id=${id}. Maybe NotificationMsg was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating NotificationMsg with id=' + id
			});
		});
};

// Delete a NotificationMsg with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	NotificationMsg.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'NotificationMsg was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete NotificationMsg with id=${id}. Maybe NotificationMsg was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete Tutorial with id=' + id
			});
		});
};
