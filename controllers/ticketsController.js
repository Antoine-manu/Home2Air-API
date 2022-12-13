const db = require('../models');
const Tickets = db.Tickets;
const Op = db.Sequelize.Op;

// Create and Save a new Tickets
exports.create = (req, res) => {
	// Validate request
	if (!req.body.user_id) {
		res.status(400).send({
			message: 'La pièce doit avoir un nom'
		});
		return;
	}
	if (!req.body.created_at) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.created_by) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.updated_at) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.updated_by) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.status) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.title) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	// Create a Tickets
	const tickets = {
		user_id: req.body.user_id,
		created_at: req.body.created_at,
		created_by: req.body.created_by,
		updated_at: req.body.updated_at,
		updated_by: req.body.updated_by,
		status: req.body.status,
		title: req.body.title
	};
	console.log(Tickets);
	// Save Tickets in the database
	Tickets.create(tickets)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while creating the Tickets.'
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
