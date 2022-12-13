const db = require('../models');
const Place = db.Place;
const Op = db.Sequelize.Op;

// Create and Save a new Place
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: 'Le rôle doit avoir un nom'
		});
		return;
	}

	// Create a Place
	const places = {
		name: req.body.name
	};
	console.log(Place);
	// Save Place in the database
	Place.create(places)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Place.'
			});
		});
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
	Place.findAll()
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
		Place.findAll({ where: condition })
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

// Find a single Place with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	Place.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Place with id=${id}.`
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

// Update a Place by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Place.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'Place was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update Place with id=${id}. Maybe Place was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating Place with id=' + id
			});
		});
};

// Delete a Place with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	Place.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'Place was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete Place with id=${id}. Maybe Place was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete Tutorial with id=' + id
			});
		});
};
