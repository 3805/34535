module.exports = function(deps) {

  var jwt = require('jsonwebtoken')
  var schema = require('../models')

  var User = deps.connection.model('User', schema.User);
  var router = deps.service.express.Router()

  router.post('/', (req, res) => {

    if (req.body.email) {
      return User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
          throw err
        }

        if (!user) {
          return res.status(403).json(deps.actions.fail('User not found.'))
        }

        if (user) {

          if (user.password != req.body.password) {
            return res.status(403).json(deps.actions.fail('Password incorrect.'))
          }

          var token = jwt.sign(user, deps.app.get('superSecret'), {})

          return res.json(deps.actions.success({
            message: 'Bon appetito!',
            token: token,
          }))

        }
      })
    }

    return res.json(deps.actions.fail('User not found.'))

  })

  return router
}
