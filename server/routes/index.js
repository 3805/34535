
module.exports = function(app, service) {
  var mongoDB = require('../mongo').dbUrl();
  var connection = service.mongoose.createConnection(mongoDB);

  var deps = {
    app: app,
    service: service,
    connection: connection,
  }

  app.get('/', (req, res) => res.send('OK ROUTES'))

  app.use('/tasks', require('./tasks')(deps))
  app.use('/users', require('./users')(deps))
  app.use('/admin', require('./admin')(deps))
  app.use('/authenticate', require('./authenticate')(deps))

}
