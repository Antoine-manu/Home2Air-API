"use strict";

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


exports.findAll = function (req, res) {}; // Find a single Company with an id


exports.findOne = function (req, res) {}; // Update a Company by the id in the request


exports.update = function (req, res) {}; // Delete a Company with the specified id in the request


exports["delete"] = function (req, res) {}; // Delete all Companies from the database.


exports.deleteAll = function (req, res) {}; // Find all published Companies


exports.findAllPublished = function (req, res) {};