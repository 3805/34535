var app = require('./server/app')

var services = {
  mongoose: require('mongoose'),
  express: require('express'),
  bodyParser: require('body-parser'),
}

var shell = () => app(services)

module.exports = shell
