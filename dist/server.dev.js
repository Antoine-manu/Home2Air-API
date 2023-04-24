"use strict";

var express = require('express'); // require('express-group-routes');


var app = express(); // Body parsers

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

try {
  app.use('/', require('./routes/routes')).use('/', require('./routes/company')).use('/', require('./routes/notifications')).use('/', require('./routes/place')).use('/', require('./routes/roles')).use('/', require('./routes/room')).use('/', require('./routes/routes')).use('/', require('./routes/sensor')).use('/', require('./routes/invite')).use('/', require('./routes/tickets')).use('/', require('./routes/user')).use('/', require('./routes/auth')).use('/', require('./routes/probe'));
  app.listen(6500, function () {
    return console.log('Server started: 6500');
  });
} catch (error) {
  console.log('error', error);
}

module.exports = app;