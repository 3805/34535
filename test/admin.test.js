module.exports = (localServer) =>
  (libs) => {

    var service = require('./config.service')

    libs.test('/GET admin (not authed)', (t) => {
      libs.supertest(localServer)
        .get('/admin')
        .end((err, res) => {
          t.notOk(res.body.success)
          t.end()
        })
    })

    libs.test('/GET admin (authed - x-access-token)', (t) => {
      libs.supertest(localServer)
        .get('/admin/teehee')
        .set('x-access-token', service.token.get())
        .end((err, res) => {
          t.ok(res.body.success)
          t.end()
        })
    })

    libs.test('/GET admin (authed - body-token)', (t) => {
      libs.supertest(localServer)
        .get('/admin/teehee')
        .send({ 'token': service.token.get() })
        .end((err, res) => {
          t.ok(res.body.success)
          t.end()
        })
    })

    libs.test('/GET admin (authed - query-token)', (t) => {
      libs.supertest(localServer)
        .get('/admin/teehee?token=' + service.token.get())
        .end((err, res) => {
          t.ok(res.body.success)
          t.end()
        })
    })
  }
