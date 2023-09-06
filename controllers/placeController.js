const { where } = require("sequelize");
const db = require("../models");
const Place = db.Place;
const Room = db.Room;
const Sensor = db.Sensor;
const UserPlaceList = db.User_place_lists;
const Op = db.Sequelize.Op;

// Create and Save a new Place
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "La Place doit avoir un nom"
    });
    return;
  }

  // Create a Place
  const places = {
    name: req.body.name,
    createdBy: req.body.createdBy
  };
  // Save Place in the database
  Place.create(places)
    .then(data => {
      const tableTransverse = {
        user_id: req.body.createdBy,
        place_id: data.id
      };
      UserPlaceList.create(tableTransverse)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the PlaceList."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Place."
      });
    });
};

// Retrieve all places from the database.
exports.findAll = (req, res) => {
	Place.findAll({
		where : {deletedAt : null}
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving placess.'
			});
		});
};

exports.findAllRoomsAndSensorFromPlaceById = async (req, res) => {
  try {
    const createdBy = req.body.user_id;
    const condition = createdBy ? { createdBy: createdBy } : null;
    const limit = req.query.limit || 10; // default to 10 if not specified
    const offset = req.query.page ? limit * (req.query.page - 1) : 0;
    const places = await Place.findAll({
      where: condition,
      include: [
        {
          model: Room,
          as: "Room",
          include: [
            {
              model: Sensor,
              as: "Sensor",
              where: { deleted_at: 0 }
            }
          ]
        }
      ],
      limit,
      offset
    });
    res.send(places);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while retrieving places"
    });
  }
};

// Find places with condition from database
exports.findBy = (req, res) => {
  const name = req.body.name;

  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  if (condition) {
    Place.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving places."
        });
      });
  } else {
    res.status(500).send({
      message: "No params found"
    });
  }
};

// Find a single Place with an id
exports.findOneById = (req, res) => {
  const id = req.body.id;

  Place.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Place with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving placess." + id
      });
    });
};

//Give place from user
exports.findAllPlacesFromUser = async (req, res) => {
    if (!req.body.user_id) {
        res.status(400).send({
            message: "Envoyez un id utilisateur pour cette requete"
        });
        return;
    }
	try {
		const user_id = req.body.user_id;
		const condition = { deletedAt : null };
		const limit = req.query.limit || 10; // default to 10 if not specified
		const offset = req.query.page ? limit * (req.query.page - 1) : 0;
		const places = await Place.findAll({
			where: {[Op.and] : condition},
			include: [
				{
					association: "Room",
					where : { deletedAt : {[Op.is]: null}},
					required: false,
				},
				{
					association: "User",
					where : { id : user_id}
				},
			],
			limit,
			offset
		});
		res.send(places);
	} catch (error) {
        console.log('______________________________')
		console.error(error);
        console.log('______________________________')
		res.status(500).send({
			message: 'An error occurred while retrieving places'
		});
	}
};

// Update a Place by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Place.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Place was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Place with id=${id}. Maybe Place was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Place with id=" + id
      });
    });
};

// Delete a Place with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Place.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Place was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Place with id=${id}. Maybe Place was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete place with id=" + id
      });
    });
};
