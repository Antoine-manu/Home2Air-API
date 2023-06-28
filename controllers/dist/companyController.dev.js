"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require('../models');

var Company = db.Company;
var Op = db.Sequelize.Op; // Create and Save a new Company

exports.create = function (req, res) {
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
  } // Create a Company


  var company = {
    name: req.body.name,
    user_id: req.body.user_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    city: req.body.city,
    zipcode: req.body.zipcode,
    phone: req.body.phone
  }; // Save Company in the database

  Company.create(company).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Company.'
    });
  });
}; // Retrieve all Companies from the database.


exports.findAll = function (req, res) {
  Company.findAll().then(function (data) {
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

  if (condition) {
    Company.findAll({
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
}; // Find a single Company with an id


exports.findOneById = function (req, res) {
  var id = req.body.id;
  Company.findByPk(id).then(function (data) {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Cannot find Company with id=".concat(id, ".")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving Companiess.' + id
    });
  });
}; // Update a Company by the id in the request


exports.update = function (req, res) {
  var id = req.params.id;
  Company.update(req.body, {
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: 'Company was updated successfully.'
      });
    } else {
      res.send({
        message: "Cannot update Company with id=".concat(id, ". Maybe Company was not found or req.body is empty!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: 'Error updating Company with id=' + id
    });
  });
}; // Delete a Company with the specified id in the request


exports["delete"] = function (req, res) {
  var id = req.body.id;
  Company.destroy({
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: 'Company was deleted successfully!'
      });
    } else {
      res.send({
        message: "Cannot delete Company with id=".concat(id, ". Maybe Company was not found!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: 'Could not delete Tutorial with id=' + id
    });
  });
};