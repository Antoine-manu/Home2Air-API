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
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Room.'
			});
		});
};

// Retrieve all room from the database.
exports.findAll = (req, res) => {
	Room.findAll({
		include: {
			association: "Sensor",
			where : { deleted_at : {[Op.is]: null}},
			required: false,
		},
		where : {deletedAt : null}
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving rooms.'
			});
		});
};

// Find room with condition from database
exports.findBy = (req, res) => {
	const key = Object.keys(req.body)[0];
	const value = req.body[key];

	var condition = value ? { [key]: { [Op.like]: `%${value}%` } } : null;
	console.log(condition);
	if (condition) {
		Room.findAll({
			where: condition,
			include: {
				association: "Sensor",
				where : { deleted_at : {[Op.is]: null}},
				required: false,
			},
		})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || 'Some error occurred while retrieving rooms.'
				});
			});
	} else {
		res.status(500).send({
			message: 'No params found'
		});
	}
};

// Find room from space
exports.findByPlace = (req, res) => {
	const id = req.body.place;
	const condition =  { place_id: { [Op.like]: `${id}` }, deletedAt : null};
	if (condition) {
		Room.findAll({ where: {[Op.and] : condition},
			include: {
				association: "Sensor",
				where : { deleted_at : {[Op.is]: null}},
				required: false,
			}, })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || 'Some error occurred while retrieving rooms.'
				});
			});
	} else {
		res.status(500).send({
			message: 'No params found'
		});
	}
};

// Find a single Room with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	Room.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Room with id=${id}.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving rooms.' + id
			});
		});
};

// Update a Room by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Room.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Room was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update Room with id=${id}. Maybe Room was not found or req.body is empty!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating Room with id=' + id
			});
		});
};

// Delete a Room with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	Room.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Room was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete Room with id=${id}. Maybe Room was not found!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete room with id=' + id
			});
		});
};
