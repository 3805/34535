module.exports = function(deps) {

  var jwt = require('jsonwebtoken')

  var router = deps.service.express.Router()
  var schema = require('../models')

  var User = deps.connection.model('User', schema.User);

  router.get('/', (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        return res.json(deps.actions.fail(err))
      }
      res.json(deps.actions.success(users))
    })
  })

  router.post('/new', (req, res) => {
    var userSchema = deps.service.mongoose.model('User', schema.User)

    var User = new userSchema({
      email: req.body.email,
      password: req.body.password,
    })

    User.save((err) => {
      if (err) {
        return res.json(deps.actions.fail(err))
      }
      res.json(deps.actions.success({ message: 'OK' }))
    })
  })


  return router

}
