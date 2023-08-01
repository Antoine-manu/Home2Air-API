"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require('../models/index.js');

var User = db['User'];
var Invite = db['Invite']; // const User = db.User

var Op = db.Sequelize.Op;

var _require = require('sequelize'),
    literal = _require.literal;

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var CryptoJS = require('crypto-js');

function decryptPassword(encryptedPassword) {
  var bytes = CryptoJS.AES.decrypt(encryptedPassword, process.env.SECRET_KEY);
  var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  return originalPassword;
} // Create and Save a new User


exports.create = function (req, res) {
  // Validate request
  if (!req.body.first_name) {
    res.status(400).send({
      message: "L'utilisateur doit avoir un prénom"
    });
    return;
  }

  if (!req.body.last_name) {
    res.status(400).send({
      message: "L'utilisateur doit avoir nom de famille"
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).send({
      message: "L'utilisateur doit avoir un email"
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: "L'utilisateur doit avoir un mot de passe"
    });
    return;
  } // Create a User


  var hash = bcrypt.hashSync(decryptPassword(req.body.password), 8);
  var user = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hash,
    role_id: 1,
    token: null,
    deleted_at: null,
    active: false
  };
  console.log(user); // Save User in the database

  User.create(user).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User.'
    });
  });
}; // Retrieve all Users from the database.


exports.findAll = function (req, res) {
  User.findAll({
    include: ['Sensor', 'Tickets', 'Notifications', 'Place', 'Role', 'Company', 'Place_created', 'InvitesRecieved', 'InvitesSent']
  }).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      error: err,
      message: err.message || 'Some error occurred while retrieving Userss.'
    });
  });
}; // Find Users with condition from database


exports.findBy = function (req, res) {
  var name = req.body.name;
  var place_id = req.body.place_id;
  var condition = {
    first_name: _defineProperty({}, Op.like, "%".concat(name, "%")),
    last_name: _defineProperty({}, Op.like, "%".concat(name, "%")),
    email: _defineProperty({}, Op.like, "%".concat(name, "%"))
  };
  console.log('CONDITION : ', name);

  if (condition) {
    User.findAll({
      where: _defineProperty({}, Op.or, condition),
      include: [{
        association: 'InvitesRecieved',
        where: {
          place_id: place_id
        },
        required: false
      }]
    }).then(function (data) {
      res.send(data);
    })["catch"](function (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Users.'
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
  console.log(id);
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
      message: err.message || 'Some error occurred while retrieving Userss.' + id
    });
  });
};

function getMostRecentObject(objects) {
  var mostRecentObject = null;
  var mostRecentUpdatedAt = null;
  objects.forEach(function (obj) {
    var updatedAt = new Date(obj.updatedAt);

    if (!mostRecentObject || updatedAt > mostRecentUpdatedAt) {
      mostRecentObject = obj;
      mostRecentUpdatedAt = updatedAt;
    }
  });
  return mostRecentObject;
} // Update a User by the id in the request


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
      message: 'Error updating User with id=' + id,
      error: err
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
      message: 'Could not delete User with id=' + id
    });
  });
};