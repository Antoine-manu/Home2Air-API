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
exports.findAll = (req, res) => {
	Roles.findAll()
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
		Roles.findAll({ where: condition })
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

// Find a single Roles with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	Roles.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Roles with id=${id}.`
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

// Update a Roles by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Roles.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'Roles was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update Roles with id=${id}. Maybe Roles was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating Roles with id=' + id
			});
		});
};

// Delete a Roles with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	Roles.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'Roles was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete Roles with id=${id}. Maybe Roles was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete Tutorial with id=' + id
			});
		});
};
