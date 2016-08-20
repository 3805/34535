var service = {
  mongoose: require('mongoose'),
  express: require('express'),
  bodyParser: require('body-parser'),
}

var app = require('./server/app')
app(service)
