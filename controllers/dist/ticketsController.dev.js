"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require('../models');

var Tickets = db.Tickets;
var Op = db.Sequelize.Op; // Create and Save a new Tickets

exports.create = function (req, res) {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: 'La pièce doit avoir un nom'
    });
    return;
  }

  if (!req.body.created_at) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.created_by) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.updated_at) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.updated_by) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.status) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  }

  if (!req.body.title) {
    res.status(400).send({
      message: 'La pièce doit être attribuée à un endroit'
    });
    return;
  } // Create a Tickets


  var tickets = {
    user_id: req.body.user_id,
    created_at: req.body.created_at,
    created_by: req.body.created_by,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    status: req.body.status,
    title: req.body.title
  };
  console.log(Tickets); // Save Tickets in the database

  Tickets.create(tickets).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Tickets.'
    });
  });
}; // Retrieve all Companies from the database.


exports.findAll = function (req, res) {
  Tickets.findAll().then(function (data) {
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
    Tickets.findAll({
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
}; // Find a single Tickets with an id


exports.findOneById = function (req, res) {
  var id = req.body.id;
  Tickets.findByPk(id).then(function (data) {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Cannot find Tickets with id=".concat(id, ".")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving Companiess.' + id
    });
  });
}; // Update a Tickets by the id in the request


exports.update = function (req, res) {
  var id = req.params.id;
  Tickets.update(req.body, {
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: 'Tickets was updated successfully.'
      });
    } else {
      res.send({
        message: "Cannot update Tickets with id=".concat(id, ". Maybe Tickets was not found or req.body is empty!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: 'Error updating Tickets with id=' + id
    });
  });
}; // Delete a Tickets with the specified id in the request


exports["delete"] = function (req, res) {
  var id = req.body.id;
  Tickets.destroy({
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: 'Tickets was deleted successfully!'
      });
    } else {
      res.send({
        message: "Cannot delete Tickets with id=".concat(id, ". Maybe Tickets was not found!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: 'Could not delete Tutorial with id=' + id
    });
  });
};