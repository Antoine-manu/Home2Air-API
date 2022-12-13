"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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


exports.findAll = function (req, res) {
  User.findAll().then(function (data) {
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
    User.findAll({
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
}; // Find a single User with an id


exports.findOneById = function (req, res) {
  var id = req.body.id;
  User.findByPk(id).then(function (data) {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Cannot find User with id=".concat(id, ".")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving Companiess.' + id
    });
  });
}; // Update a User by the id in the request


exports.update = function (req, res) {
  var id = req.params.id;
  User.update(req.body, {
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: 'User was updated successfully.'
      });
    } else {
      res.send({
        message: "Cannot update User with id=".concat(id, ". Maybe User was not found or req.body is empty!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: 'Error updating User with id=' + id
    });
  });
}; // Delete a User with the specified id in the request


exports["delete"] = function (req, res) {
  var id = req.body.id;
  User.destroy({
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: 'User was deleted successfully!'
      });
    } else {
      res.send({
        message: "Cannot delete User with id=".concat(id, ". Maybe User was not found!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: 'Could not delete Tutorial with id=' + id
    });
  });
};