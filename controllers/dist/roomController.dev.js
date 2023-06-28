"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require('../models');

var Room = db.Room;
var Op = db.Sequelize.Op; // Create and Save a new Room

exports.create = function (req, res) {
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
  } // Create a Room


  var room = {
    name: req.body.name,
    place_id: req.body.place_id
  };
  console.log(Room); // Save Room in the database

  Room.create(room).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Room.'
    });
  });
}; // Retrieve all room from the database.


exports.findAll = function (req, res) {
  Room.findAll({
    include: ['Sensor']
  }).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving rooms.'
    });
  });
}; // Find room with condition from database


exports.findBy = function (req, res) {
  var key = Object.keys(req.body)[0];
  var value = req.body[key];
  var condition = value ? _defineProperty({}, key, _defineProperty({}, Op.like, "%".concat(value, "%"))) : null;
  console.log(condition);

  if (condition) {
    Room.findAll({
      where: condition
    }).then(function (data) {
      res.send(data);
    })["catch"](function (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving rooms.'
      });
    });
  } else {
    res.status(500).send({
      message: 'No params found'
    });
  }
}; // Find a single Room with an id


exports.findOneById = function (req, res) {
  var id = req.body.id;
  Room.findByPk(id).then(function (data) {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Cannot find Room with id=".concat(id, ".")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving rooms.' + id
    });
  });
}; // Update a Room by the id in the request


exports.update = function (req, res) {
  var id = req.params.id;
  Room.update(req.body, {
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: 'Room was updated successfully.'
      });
    } else {
      res.send({
        message: "Cannot update Room with id=".concat(id, ". Maybe Room was not found or req.body is empty!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: 'Error updating Room with id=' + id
    });
  });
}; // Delete a Room with the specified id in the request


exports["delete"] = function (req, res) {
  var id = req.body.id;
  Room.destroy({
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: 'Room was deleted successfully!'
      });
    } else {
      res.send({
        message: "Cannot delete Room with id=".concat(id, ". Maybe Room was not found!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: 'Could not delete room with id=' + id
    });
  });
};