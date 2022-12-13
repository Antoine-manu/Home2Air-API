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
exports.findAll = (req, res) => {
	User_place_list.findAll()
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
		User_place_list.findAll({ where: condition })
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

// Find a single User_place_list with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	User_place_list.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find User_place_list with id=${id}.`
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

// Update a User_place_list by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	User_place_list.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'User_place_list was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update User_place_list with id=${id}. Maybe User_place_list was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating User_place_list with id=' + id
			});
		});
};

// Delete a User_place_list with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	User_place_list.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'User_place_list was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete User_place_list with id=${id}. Maybe User_place_list was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete Tutorial with id=' + id
			});
		});
};
