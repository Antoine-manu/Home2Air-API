"use strict";

var express = require('express'); // require('express-group-routes');


var app = express();

try {
  app.use('/api/v1', require('./routes/routes'));
  app.listen(6500, function () {
    return console.log('Server started: 6500');
  });
} catch (error) {
  console.log('error', error);
}