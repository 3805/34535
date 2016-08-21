
module.exports = function(app, service) {
  var mongoDB = require('../mongo').dbUrl;
  var connection = service.mongoose.createConnection(mongoDB);

  app.get('/', (req, res) => res.send('OK ROUTES'))
  app.use('/tasks', require('./tasks')(app, service, connection))
  app.use('/users', require('./users')(app, service, connection))
}
