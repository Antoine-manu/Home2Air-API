const db = require('../models');
const Tickets = db.Tickets;
const Op = db.Sequelize.Op;

// Create and Save a new Tickets
exports.create = (req, res) => {
	// Validate request
	if (!req.body.created_by) {
		res.status(400).send({
			message: 'La ticket doit etre créer par un utilisateur'
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
		created_by: req.body.created_by,
		status: 0,
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

// Retrieve all Tickets from the database.
exports.findAll = (req, res) => {
	Tickets.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving Ticketss.'
			});
		});
};

// Find Tickets with condition from database
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
						err.message || 'Some error occurred while retrieving Tickets.'
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
					err.message || 'Some error occurred while retrieving Ticketss.' + id
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
				message: 'Could not delete Ticket with id=' + id
			});
		});
};
