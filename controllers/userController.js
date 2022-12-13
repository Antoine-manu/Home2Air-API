const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
	// Validate request
	if (!req.body.username) {
		res.status(400).send({
			message: 'La pièce doit avoir un nom'
		});
		return;
	}
	if (!req.body.first_name) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.last_name) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.email) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.role_id) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.token) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.created_at) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.deleted_at) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.active) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	// Create a User
	const user = {
		username: req.body.username,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		role_id: req.body.role_id,
		token: req.body.token,
		created_at: req.body.created_at,
		deleted_at: req.body.deleted_at,
		active: req.body.active
	};
	console.log(User);
	// Save User in the database
	User.create(user)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while creating the User.'
			});
		});
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
	User.findAll()
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
		User.findAll({ where: condition })
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

// Find a single User with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	User.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find User with id=${id}.`
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

// Update a User by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	User.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'User was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating User with id=' + id
			});
		});
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	User.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'User was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete User with id=${id}. Maybe User was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete Tutorial with id=' + id
			});
		});
};
