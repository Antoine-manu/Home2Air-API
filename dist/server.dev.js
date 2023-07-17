"use strict";

var express = require('express');

var cors = require('cors'); // require('express-group-routes');


var app = express(); // Body parsers

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());

var corsOptionsDelegate = function corsOptionsDelegate(req, callback) {
  var corsOptions;

  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {
      origin: false
    }; // disable CORS for this request
  }

  callback(null, corsOptions); // callback expects two parameters: error and options
};

try {
  app.use('/api/v1/', require('./routes/routes')).use('/api/v1/', require('./routes/company')).use('/api/v1/', require('./routes/notifications')).use('/api/v1/', require('./routes/place')).use('/api/v1/', require('./routes/roles')).use('/api/v1/', require('./routes/room')).use('/api/v1/', require('./routes/routes')).use('/api/v1/', require('./routes/sensor')).use('/api/v1/', require('./routes/invite')).use('/api/v1/', require('./routes/tickets')).use('/api/v1/', require('./routes/user')).use('/api/v1/', require('./routes/auth')).use('/api/v1/', require('./routes/probe'));
  app.listen(6500, '192.168.1.152', cors(corsOptionsDelegate), function () {
    return console.log('Server started: 6500');
  });
} catch (error) {
  console.log('error', error);
}

module.exports = app;