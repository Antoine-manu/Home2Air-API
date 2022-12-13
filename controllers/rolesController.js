const db = require('../models');
const Roles = db.Roles;
const Op = db.Sequelize.Op;

// Create and Save a new Roles
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: 'Le rôle doit avoir un nom'
		});
		return;
	}

	// Create a Roles
	const roles = {
		name: req.body.name
	};
	console.log(Roles);
	// Save Roles in the database
	Roles.create(roles)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Roles.'
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
