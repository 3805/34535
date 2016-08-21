var app = require('./server/app')

var services = {
  mongoose: require('mongoose'),
  express: require('express'),
  bodyParser: require('body-parser'),
}

// app(services)
// module.exports = app

var shell = () => app(services)

module.exports = shell
