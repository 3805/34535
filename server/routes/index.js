
module.exports = function(app, service) {
  app.get('/', (req, res) => res.send('OK ROUTES'))
  app.use('/tasks', require('./task')(app, service))
}
