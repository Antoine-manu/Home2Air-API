const db = require('../models');
const NotificationsConfig = db.Notifications_config;
const Op = db.Sequelize.Op;

// Create and Save a new Notification's config
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title) {
		res.status(400).send({
			message: 'La config doit avoir un titre'
		});
		return;
	}
	if (!req.body.message) {
		res.status(400).send({
			message: 'La config doit avoir un message'
		});
		return;
	}

	// Create a Notification config
	const config = {
		title: req.body.title,
		data: req.body.data,
		percent: req.body.percent,
		sound_id: req.body.sound_id,
		icon_id: req.body.icon_id,
		type: req.body.type_id,
		message: req.body.message,
		user_id: req.body.user_id
	};
	// Save Notification's config in the database
	NotificationsConfig.create(config)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Config.'
			});
		});
};

// Retrieve all Notifications configs from the database.
exports.findAll = (req, res) => {
	NotificationsConfig.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving Notifications.'
			});
		});
};

exports.findUserConfigs = (req, res) => {
	const user_id = req.body.user_id;
	const condition = { user_id: user_id };
	NotificationsConfig.findAll({ where: { [Op.and]: condition } })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving the configurations.'
			});
		});
};

// Find Notifications configs with condition from database
exports.findBy = (req, res) => {
	const name = req.body.name;

	const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

	if (condition) {
		NotificationsConfig.findAll({ where: condition })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message:
						err.message ||
						'Some error occurred while retrieving notifications config.'
				});
			});
	} else {
		res.status(500).send({
			message: 'No params found'
		});
	}
};

// Find a single notifications config with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	NotificationsConfig.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find notification's config with id=${id}.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving Notification config.' + id
			});
		});
};

// Update a notifications by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	NotificationsConfig.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'notifications config was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update notifications config with id=${id}. Maybe config was not found or req.body is empty!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating config with id=' + id
			});
		});
};

// Delete a notifications with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;
	console.log(req.body.id);
	NotificationsConfig.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'config was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete notifications with id=${id}. Maybe notifications config was not found!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Notification config with id=' + id
			});
		});
};
