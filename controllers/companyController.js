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
	Company.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
				err.message || "Some error occurred while retrieving Companiess."
			});
		});
};

// Find Companies with condition from database
exports.findBy = (req, res) => {
	const name = req.body.name;
  
	var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
	console.log(condition)
	if(condition){
		Company.findAll({ where: condition })
			.then(data => {
			res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
					err.message || "Some error occurred while retrieving tutorials."
				});
			});
	} else {
		res.status(500).send({
			message:
			"No params found"
		});
	}
};

// Find a single Company with an id
exports.findOneById = (req, res) => {
	const id = req.body.id;
  
	Company.findByPk(id)
	  .then(data => {
		if (data) {
			res.send(data);
		  } else {
			res.status(404).send({
			  message: `Cannot find Company with id=${id}.`
			});
		  }
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving Companiess." + id
		});
	  });
};

// Update a Company by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Company.update(req.body, {
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "Company was updated successfully."
		  });
		} else {
		  res.send({
			message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error updating Company with id=" + id
		});
	  });
};

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
	const id = req.body.id;

	Company.destroy({
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  res.send({
			message: "Company was deleted successfully!"
		  });
		} else {
		  res.send({
			message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Could not delete Tutorial with id=" + id
		});
	  });
};
