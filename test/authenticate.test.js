module.exports = (localServer) =>
  (libs) => {

    libs.test('/POST authenticate user (empty)', (t) => {
      libs.supertest(localServer)
        .post('/authenticate')
        .send({})
        .end((err, res) => {
          t.notOk(res.body.success)
          t.equal(res.body.message, 'User not found.')
          t.end()
        })
    })

    libs.test('/POST authenticate user (wrong JSON keys)', (t) => {
      libs.supertest(localServer)
        .post('/authenticate')
        .send({
          aasd: 'asdasd'
        })
        .end((err, res) => {
          t.notOk(res.body.success)
          t.equal(res.body.message, 'User not found.')
          t.end()
        })
    })

    libs.test('/POST authenticate user (wrong username)', (t) => {
      libs.supertest(localServer)
        .post('/authenticate')
        .send({
          email: 'asdasd',
          password: '12312',
        })
        .end((err, res) => {
          t.notOk(res.body.success)
          t.equal(res.body.message, 'User not found.')
          t.end()
        })
    })

    libs.test('/POST authenticate user (wrong password)', (t) => {
      libs.supertest(localServer)
        .post('/authenticate')
        .send({
          email: 'test@test.test',
          password: '12312',
        })
        .end((err, res) => {
          t.notOk(res.body.success)
          t.equal(res.body.message, 'Password incorrect.')
          t.end()
        })
    })

    libs.test('/POST login (Success)', (t) => {
      libs.supertest(localServer)
        .post('/authenticate')
        .send({
          email: 'test@test.test',
          password: '123',
        })
        .end((err, res) => {
          t.ok(res.body.success)
          if (res.body.success === true) {
            require('./config.token').set(res.body.token)
          }
          t.end()
        })
    })
  }
