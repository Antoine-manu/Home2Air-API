const db = require('../models');
const User_place_list = db.User_place_list;
const Op = db.Sequelize.Op;

// Create and Save a new User_place_list
exports.create = (req, res) => {
	// Validate request
	if (!req.body.user_id) {
		res.status(400).send({
			message: 'La pièce doit avoir un nom'
		});
		return;
	}
	if (!req.body.place_id) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	// Create a User_place_list
	const userPL = {
		user_id: req.body.user_id,
		place_id: req.body.place_id
	};
	console.log(User_place_list);
	// Save User_place_list in the database
	User_place_list.create(userPL)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the User_place_list.'
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
