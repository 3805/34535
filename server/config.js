module.exports = function(app, service) {
  app.use(service.bodyParser.json())

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

  service.mongoose.Promise = Promise
  service.mongoose.connect(require('./mongo').dbUrl())
}
