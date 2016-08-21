module.exports = function(app, service, connection) {

  var jwt = require('jsonwebtoken')

  var router = service.express.Router()
  var schema = require('../models')

  var User = connection.model('User', schema.User);

  router.get('/', (req, res) => {
    User.find({}, (err, users) => res.json(users))
  })

  router.post('/new', (req, res) => {
    var userSchema = service.mongoose.model('User', schema.User)

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

  router.post('/authenticate', (req, res) => {

    if (req.body.email) {
      return User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
          throw err
        }

        if (!user) {
          return res.json({
            success: false,
            message: 'User not found.'
          })
        }

        if (user) {

          if (user.password != req.body.password) {
            return res.json({
              success: false,
              message: 'Password incorrect.'
            })
          }

          var token = jwt.sign(user, app.get('superSecret'), {
            expiresInMinutes: 1440 // expires in 24 hours
          })

          return res.json({
            success: true,
            message: 'Bon appetito!',
            // token: token,
          })

        }
      })
    }

    return res.json({
      success: false,
      message: 'User not found.'
    })

  })
  return router

}
