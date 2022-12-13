const db = require('../models');
const Tickets_commentaire = db.Tickets_commentaire;
const Op = db.Sequelize.Op;

// Create and Save a new Tickets_commentaire
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: 'La pièce doit avoir un nom'
		});
		return;
	}
	if (!req.body.room_id) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.createdBy) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}
	if (!req.body.parameters) {
		res.status(400).send({
			message: 'La pièce doit être attribuée à un endroit'
		});
		return;
	}

	// Create a Tickets_commentaire
	const tickets_comm = {
		tickets_id: req.body.tickets_id,
		content: req.body.content
	};
	console.log(Tickets_commentaire);
	// Save Tickets_commentaire in the database
	Tickets_commentaire.create(tickets_comm)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the Tickets_commentaire.'
			});
		});
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
	Tickets_commentaire.findAll()
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
		Tickets_commentaire.findAll({ where: condition })
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

// Find a single Tickets_commentaire with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	Tickets_commentaire.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Tickets_commentaire with id=${id}.`
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

// Update a Tickets_commentaire by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Tickets_commentaire.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'Tickets_commentaire was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update Tickets_commentaire with id=${id}. Maybe Tickets_commentaire was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating Tickets_commentaire with id=' + id
			});
		});
};

// Delete a Tickets_commentaire with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	Tickets_commentaire.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: 'Tickets_commentaire was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete Tickets_commentaire with id=${id}. Maybe Tickets_commentaire was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete Tutorial with id=' + id
			});
		});
};
