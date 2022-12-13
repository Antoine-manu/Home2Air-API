"use strict";

var db = require('../models');

var User = db.User;
var Op = db.Sequelize.Op; // Create and Save a new User

exports.create = function (req, res) {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: 'La pièce doit avoir un nom'
    });
    return;
  }

  if (!req.body.first_name) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.last_name) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.role_id) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.token) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.created_at) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.deleted_at) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.active) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  } // Create a User


  var user = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    role_id: req.body.role_id,
    token: req.body.token,
    created_at: req.body.created_at,
    deleted_at: req.body.deleted_at,
    active: req.body.active
  };
  console.log(User); // Save User in the database

  User.create(user).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User.'
    });
  });
}; // Retrieve all Companies from the database.


exports.findAll = function (req, res) {}; // Find a single Company with an id


exports.findOne = function (req, res) {}; // Update a Company by the id in the request


exports.update = function (req, res) {}; // Delete a Company with the specified id in the request


exports["delete"] = function (req, res) {}; // Delete all Companies from the database.


exports.deleteAll = function (req, res) {}; // Find all published Companies


exports.findAllPublished = function (req, res) {};