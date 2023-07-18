"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require('../models');

var Sensor = db.Sensor;
var Op = db.Sequelize.Op;

function referenceBuilder() {
  var reference = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (var i = 0; i < 10; i++) {
    var selected = '';

    for (var j = 0; j < 27; j++) {
      if (i == 7) {
        selected = '-';
      } else if (i > 7) {
        selected = "".concat(Math.floor(Math.random() * 10));
      } else {
        selected = chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    reference += selected;
  }

  console.log('reference', reference);
  return reference;
} // Create and Save a new Sensor


exports.create = function (req, res) {
  // Validate request
  console.log('req --- ', req);

  if (!req.body.name) {
    res.status(400).send({
      message: 'Le capteur doit avoir un nom'
    });
    return;
  } // Create a Sensor


  var sensor = {
    name: req.body.name,
    reference: referenceBuilder(),
    deleted_at: null,
    active: true,
    room_id: req.body.room_id,
    createdBy: req.body.createdBy,
    address: '192.168.1.83:5000',
    parameters: JSON.stringify({
      notifications: true,
      advanced: false,
      temperature: 'Celsius'
    })
  };
  console.log('sensor: ', sensor); // Save Sensor in the database

  Sensor.create(sensor).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Sensor.'
    });
  });
}; // Retrieve all sensors from the database.


exports.findAll = function (req, res) {
  Sensor.findAll().then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving sensorss.'
    });
  });
}; // Find sensors with condition from database


exports.findBy = function (req, res) {
  var name = req.body.name;
  console.log(name);
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
        message: err.message || 'Some error occurred while retrieving sensors.'
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
      message: err.message || 'Some error occurred while retrieving sensorss.' + id
    });
  });
}; // Update a Sensor by the id in the request


exports.update = function (req, res) {
  console.log('req', req.body);
  Sensor.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: 'Sensor was updated successfully.'
      });
    } else {
      res.send({
        message: "Cannot update Sensor with id=".concat(req.params.id, ". Maybe Sensor was not found or req.body is empty!")
      });
    }
  })["catch"](function (err) {
    console.log('err.msg:  ', err.message);
    res.status(500).send({
      message: 'Error updating Sensor with id=' + req.params.id
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
      message: 'Could not delete sensor with id=' + id
    });
  });
};