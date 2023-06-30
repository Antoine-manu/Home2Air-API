const db = require('../models');
const Sensor = db.Sensor;
const Op = db.Sequelize.Op;

// Create and Save a new Sensor
exports.create = (req, res) => {
	// Validate request
	console.log('req --- ', req);
	if (!req.body.name) {
		res.status(400).send({
			message: 'Le capteur doit avoir un nom'
		});
		return;
	}
	// Create a Sensor
	const sensor = {
		name: req.body.name,
		deleted_at: null,
		active: true,
		room_id: req.body.room_id,
		createdBy: req.body.createdBy,
		address : "192.168.1.83:5000",
		parameters: JSON.stringify({
			notifications: true,
			advanced: false,
			temperature: 1
		})
	};
	console.log('sensor: ', sensor);
	// Save Sensor in the database
	Sensor.create(sensor)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Sensor.'
			});
		});
};

// Retrieve all sensors from the database.
exports.findAll = (req, res) => {
	Sensor.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving sensorss.'
			});
		});
};

// Find sensors with condition from database
exports.findBy = (req, res) => {
	const name = req.body.name;
	console.log(name);
	let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
	console.log(condition);
	if (condition) {
		Sensor.findAll({ where: condition })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while retrieving sensors.'
				});
			});
	} else {
		res.status(500).send({
			message: 'No params found'
		});
	}
};

// Find a single Sensor with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;

	Sensor.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Sensor with id=${id}.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving sensorss.' + id
			});
		});
};

// Update a Sensor by the id in the request
exports.update = (req, res) => {
	console.log('req', req.body);
	Sensor.update(req.body, {
		where: { id: req.params.id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Sensor was updated successfully.'
				});
			} else {
				res.send({
					message: `Cannot update Sensor with id=${req.params.id}. Maybe Sensor was not found or req.body is empty!`
				});
			}
		})
		.catch((err) => {
			console.log('err.msg:  ', err.message);
			res.status(500).send({
				message: 'Error updating Sensor with id=' + req.params.id
			});
		});
};

// Delete a Sensor with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	Sensor.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Sensor was deleted successfully!'
				});
			} else {
				res.send({
					message: `Cannot delete Sensor with id=${id}. Maybe Sensor was not found!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete sensor with id=' + id
			});
		});
};
