module.exports = function(app, service, connection) {

  var jwt = require('jsonwebtoken')

  var router = service.express.Router()
  var schema = require('../models')

  var User = connection.model('User', schema.User);

  router.post('/authenticate', (req, res) => {

    if (req.body.email) {
      return User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
          throw err
        }

        if (!user) {
          return res.status(403).json({
            success: false,
            message: 'User not found.'
          })
        }

        if (user) {

          if (user.password != req.body.password) {
            return res.status(403).json({
              success: false,
              message: 'Password incorrect.'
            })
          }

          var token = jwt.sign(user, app.get('superSecret'), {})

          return res.json({
            success: true,
            message: 'Bon appetito!',
            token: token,
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
