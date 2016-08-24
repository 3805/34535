module.exports = (localServer) =>
  (libs) => {

    libs.test('/POST authenticate user (empty)', (t) => {
      libs.supertest(localServer)
        .post('/authenticate')
        .send({})
        .end((err, res) => {
          t.notOk(res.body.success)
          t.equal(res.body.data, 'User not found.')
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
          t.equal(res.body.data, 'User not found.')
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
          t.equal(res.body.data, 'User not found.')
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
          t.equal(res.body.data, 'Password incorrect.')
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
            require('./config.service').token.set(res.body.data.token)
          }
          t.end()
        })
    })
  }
