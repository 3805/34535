module.exports = function(deps) {

  var jwt = require('jsonwebtoken')

  var adminRoutes = deps.service.express.Router()

  adminRoutes.use((req, res, next) => {

    var token = req.body.token ||
      req.query.token ||
      req.headers['x-access-token']

    if (token) {
      return jwt.verify(token, deps.app.get('superSecret'), (err, decoded) => {
        if (err) {
          return res.status(403).json(deps.actions.fail({
            message: 'Failed to authenticate token.'
          }))
        }
        req.decoded = decoded
        next()
      })
    }

    return res.status(403).json(deps.actions.fail({
      message: 'No token provided.'
    }))
  })

  adminRoutes.get('/teehee', (req, res) => res.json(deps.actions.success({
    message: 'You win.'
  })))

  return adminRoutes
}
