module.exports = function(app, service) {
  app.use(service.bodyParser.json())

  app.set('superSecret', require('./mongo').secret)

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )
    res.header(
      'Access-Control-Allow-Methods',
      'POST, GET, PUT, DELETE, OPTIONS'
    )
    next()
  })

  service.mongoose.Promise = Promise
  service.mongoose.connect(require('./mongo').dbUrl())
}
