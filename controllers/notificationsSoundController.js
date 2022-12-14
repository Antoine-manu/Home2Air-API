const db = require('../models');
const NotificationSnd = db.NotificationS_sound;
const Op = db.Sequelize.Op;

// Create and Save a new NotificationSnd
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: 'La sonnerie doit avoir un nom'
		});
		return;
	}

	// Create a NotificationSnd
	const notifSnd = {
		name: req.body.name
	};
	console.log(NotificationSnd);
	// Save NotificationSnd in the database
	NotificationSnd.create(notifSnd)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the NotificationSnd.'
			});
		});
};

// Retrieve all notification sound from the database.
exports.findAll = (req, res) => {
	NotificationSnd.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving notification sounds.'
			});
		});
};

// Find notification sound with condition from database
exports.findBy = (req, res) => {
	const name = req.body.name;

	var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
	console.log(condition);
	if (condition) {
		NotificationSnd.findAll({ where: condition })
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while retrieving notification sounds.'
				});
			});
	} else {
		res.status(500).send({
			message: 'No params found'
		});
	}
};

// Find a single NotificationSnd with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	NotificationSnd.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find NotificationSnd with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving notification sounds.' + id
			});
		});
};

// Update a NotificationSnd by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	NotificationSnd.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'NotificationSnd was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update NotificationSnd with id=${id}. Maybe NotificationSnd was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating NotificationSnd with id=' + id
			});
		});
};

// Delete a NotificationSnd with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	NotificationSnd.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'NotificationSnd was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete NotificationSnd with id=${id}. Maybe NotificationSnd was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete notification sound with id=' + id
			});
		});
};
