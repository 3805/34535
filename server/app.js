module.exports = function(service) {
  var app = service.express()
  require('./config')(app, service)
  require('./routes')(app, {
    express: service.express,
    mongoose: service.mongoose
  })
  return app.listen(8080)
}
