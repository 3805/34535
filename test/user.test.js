module.exports = (localServer) =>
  (libs) => {
    libs.test('/GET users', (t) => {
      libs.supertest(localServer)
      .get('/users')
      .end((err, res) => {
        t.ok(typeof res === 'object')
        t.end()
      })
    })

    libs.test('/POST users (empty)', (t) => {
      libs.supertest(localServer)
      .post('/users/new')
      .send({})
      .end((err, res) => {
        t.ok(res.body.message === 'User validation failed')
        t.end()
      })
    })
  }
