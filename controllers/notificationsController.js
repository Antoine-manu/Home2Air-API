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
				message: err.message || 'Some error occurred while creating the Notification.'
			});
		});
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {};

// Find a single Company with an id
exports.findOne = (req, res) => {};

// Update a Company by the id in the request
exports.update = (req, res) => {};

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Companies from the database.
exports.deleteAll = (req, res) => {};

// Find all published Companies
exports.findAllPublished = (req, res) => {};
