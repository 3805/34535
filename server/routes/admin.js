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
          return res.json({
            success: false,
            message: 'Failed to authenticate token.'
          })
        }
        req.decoded = decoded
        next()
      })
    }

    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  })


  adminRoutes.get('/teehee', (req, res) => res.json({
    success: true,
    message: 'you win',
  }))

  return adminRoutes
}
