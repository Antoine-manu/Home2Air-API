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
exports.findAll = (req, res) => {
	Tickets.findAll()
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
		Tickets.findAll({ where: condition })
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

// Find a single Tickets with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	Tickets.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Tickets with id=${id}.`
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

// Update a Tickets by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Tickets.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'Tickets was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update Tickets with id=${id}. Maybe Tickets was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating Tickets with id=' + id
			});
		});
};

// Delete a Tickets with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	Tickets.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'Tickets was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete Tickets with id=${id}. Maybe Tickets was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete Tutorial with id=' + id
			});
		});
};
