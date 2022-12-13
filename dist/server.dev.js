"use strict";

var express = require('express'); // require('express-group-routes');


var app = express(); // Body parsers

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

try {
  app.use('/api/v1', require('./routes/routes')).use('/api/v1', require('./routes/user'));
  app.listen(6500, function () {
    return console.log('Server started: 6500');
  });
} catch (error) {
  console.log('error', error);
}