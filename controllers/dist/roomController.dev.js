"use strict";

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
}; // Retrieve all Companies from the database.


exports.findAll = function (req, res) {}; // Find a single Company with an id


exports.findOne = function (req, res) {}; // Update a Company by the id in the request


exports.update = function (req, res) {}; // Delete a Company with the specified id in the request


exports["delete"] = function (req, res) {}; // Delete all Companies from the database.


exports.deleteAll = function (req, res) {}; // Find all published Companies


exports.findAllPublished = function (req, res) {};