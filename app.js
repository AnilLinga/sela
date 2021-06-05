
'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv')
dotenv.config()
console.log(process.env.DB_URL)
// Connect to database
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true, useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', function () {
  console.log('Conection has been made!');
}).on('error', function (error) {
  console.log('Error is: ', error);
});

// Setup server
var app = express();
/* Allowing cors headers */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var server = require('http').createServer(app);
app.use('/', require('./routes/invoice'));
// Start server
server.listen(process.env.PORT, function () {
  console.log('Express server listening on %d, in %s mode', process.env.PORT, app.get('env'), __dirname);
});

