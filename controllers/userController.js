const db = require('../models/index.js');
const User = db['User'];
const Invite = db['Invite'];
// const User = db.User
const Op = db.Sequelize.Op;
const { literal } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');

function decryptPassword(encryptedPassword) {
	const bytes = CryptoJS.AES.decrypt(encryptedPassword, process.env.SECRET_KEY);
	const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

	return originalPassword;
}

// Create and Save a new User
exports.create = (req, res) => {
	// Validate request
	if (!req.body.first_name) {
		res.status(400).send({
			message: "L'utilisateur doit avoir un prénom"
		});
		return;
	}
	if (!req.body.last_name) {
		res.status(400).send({
			message: "L'utilisateur doit avoir nom de famille"
		});
		return;
	}
	if (!req.body.email) {
		res.status(400).send({
			message: "L'utilisateur doit avoir un email"
		});
		return;
	}
	if (!req.body.password) {
		res.status(400).send({
			message: "L'utilisateur doit avoir un mot de passe"
		});
		return;
	}
	// Create a User
	const hash = bcrypt.hashSync(decryptPassword(req.body.password), 8);

	const user = {
		username: req.body.username,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: hash,
		role_id: 1,
		token: null,
		deleted_at: null,
		active: false
	};

	console.log(user);
	// Save User in the database
	User.create(user)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the User.'
			});
		});
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
	User.findAll({
		include: [
			'Sensor',
			'Tickets',
			'Notifications',
			'Place',
			'Role',
			'Company',
			'Place_created',
			'InvitesRecieved',
			'InvitesSent'
		]
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				error: err,
				message: err.message || 'Some error occurred while retrieving Userss.'
			});
		});
};

// Find Users with condition from database
exports.findBy = (req, res) => {
	const name = req.body.name;
	const place_id = req.body.place_id;

	var condition = {
		first_name: { [Op.like]: `%${name}%` },
		last_name: { [Op.like]: `%${name}%` },
		email: { [Op.like]: `%${name}%` }
	};
	console.log('CONDITION : ', name);
	if (condition) {
		User.findAll({
			where: { [Op.or]: condition },
			include: [
				{
					association: 'InvitesRecieved',
					where: {
						place_id: place_id
					},
					required: false
				}
			]
		})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || 'Some error occurred while retrieving Users.'
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
	console.log(id);

	User.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find User with id=${id}.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving Userss.' + id
			});
		});
};

function getMostRecentObject(objects) {
	let mostRecentObject = null;
	let mostRecentUpdatedAt = null;

	objects.forEach((obj) => {
		const updatedAt = new Date(obj.updatedAt);
		if (!mostRecentObject || updatedAt > mostRecentUpdatedAt) {
			mostRecentObject = obj;
			mostRecentUpdatedAt = updatedAt;
		}
	});

	return mostRecentObject;
}

// Update a User by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	User.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
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
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating User with id=' + id,
				error: err
			});
		});
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	User.destroy({
		where: { id: id }
	})
		.then((num) => {
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
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete User with id=' + id
			});
		});
};
