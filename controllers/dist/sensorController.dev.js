"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require('../models');

var Sensor = db.Sensor;
var Op = db.Sequelize.Op; // Create and Save a new Sensor

exports.create = function (req, res) {
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
  } // Create a Sensor


  var sensor = {
    name: req.body.name,
    deleted_at: req.body.deleted_at,
    active: req.body.active,
    room_id: req.body.room_id,
    createdBy: req.body.created_by,
    parameters: req.body.parameters
  };
  console.log(Sensor); // Save Sensor in the database

  Sensor.create(sensor).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Sensor.'
    });
  });
}; // Retrieve all Companies from the database.


exports.findAll = function (req, res) {
  Sensor.findAll().then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving Companiess.'
    });
  });
}; // Find Companies with condition from database


exports.findBy = function (req, res) {
  var name = req.body.name;
  var condition = name ? {
    name: _defineProperty({}, Op.like, "%".concat(name, "%"))
  } : null;
  console.log(condition);

  if (condition) {
    Sensor.findAll({
      where: condition
    }).then(function (data) {
      res.send(data);
    })["catch"](function (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tutorials.'
      });
    });
  } else {
    res.status(500).send({
      message: 'No params found'
    });
  }
}; // Find a single Sensor with an id


exports.findOneById = function (req, res) {
  var id = req.body.id;
  Sensor.findByPk(id).then(function (data) {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Cannot find Sensor with id=".concat(id, ".")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving Companiess.' + id
    });
  });
}; // Update a Sensor by the id in the request


exports.update = function (req, res) {
  var id = req.params.id;
  Sensor.update(req.body, {
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: 'Sensor was updated successfully.'
      });
    } else {
      res.send({
        message: "Cannot update Sensor with id=".concat(id, ". Maybe Sensor was not found or req.body is empty!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: 'Error updating Sensor with id=' + id
    });
  });
}; // Delete a Sensor with the specified id in the request


exports["delete"] = function (req, res) {
  var id = req.body.id;
  Sensor.destroy({
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: 'Sensor was deleted successfully!'
      });
    } else {
      res.send({
        message: "Cannot delete Sensor with id=".concat(id, ". Maybe Sensor was not found!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: 'Could not delete Tutorial with id=' + id
    });
  });
};