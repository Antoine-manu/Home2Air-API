const db = require("../models");
const Company = db.Company;
const Op = db.Sequelize.Op;

// Create and Save a new Company
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: "L'entreprise doit avoir un nom"
		});
		return;
	}
	if (!req.body.address || !req.body.zipcode || !req.body.city) {
		res.status(400).send({
			message: "L'entreprise doit avoir une adresse"
		});
		return;
	}

	// Create a Company
	const company = {
		name: req.body.name,
		user_id: req.body.user_id,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		address: req.body.address,
		city: req.body.city,
		zipcode: req.body.zipcode,
		phone: req.body.phone,
	};
	console.log(Company)
	// Save Company in the database
	Company.create(company)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
		message:
			err.message || "Some error occurred while creating the Company."
		});
	});
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Company with an id
exports.findOne = (req, res) => {
  
};

// Update a Company by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Companies from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Companies
exports.findAllPublished = (req, res) => {
  
};
