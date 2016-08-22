module.exports = function(deps) {

  var jwt = require('jsonwebtoken')

  var router = deps.service.express.Router()
  var schema = require('../models')

  var User = deps.connection.model('User', schema.User);

  router.get('/', (req, res) => {
    User.find({}, (err, users) => res.json(users))
  })

  router.post('/new', (req, res) => {
    var userSchema = deps.service.mongoose.model('User', schema.User)

    var user = new userSchema({
      email: req.body.email,
      password: req.body.password,
    })

    user.save((err) => {
      if (err) {
        return res.json(err)
      }
      return res.json(obj)
    })
  })


  return router

}
