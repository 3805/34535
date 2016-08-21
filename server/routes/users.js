module.exports = function(app, service, connection) {

  var router = service.express.Router()
  var schema = require('../models')

  router.get('/', (req, res) => {
    var User = connection.model('User', schema.User);
    User.find({}, (err, data) => res.json(data))
  })

  router.post('/new', (req, res) => {
    var userSchema = service.mongoose.model('User', schema.User)

    var user = new userSchema({
      email: req.body.email,
      password: req.body.password,
    })

    user.save((err) => err ? res.send(err) : res.send(obj))
  })

  return router

}
