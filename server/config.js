module.exports = function(app, service) {
  app.use(service.bodyParser.json())

  service.mongoose.Promise = Promise
  service.mongoose.connect(require('./mongo').dbUrl)
}
