const db = require('../models');
const Room = db.Room;
const Op = db.Sequelize.Op;

// Create and Save a new Room
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
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

	// Create a Room
	const room = {
		name: req.body.name,
		place_id: req.body.place_id
	};
	console.log(Room);
	// Save Room in the database
	Room.create(room)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Room.'
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
