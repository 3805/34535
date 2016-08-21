var libs = require('./config.libs')
var app = require('../shell')
var localServer = require('./config.url')

require('./config')(libs)
app(require('./config.spies')(libs))

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

libs.test('/POST authenticate user (empty)', (t) => {
  libs.supertest(localServer)
    .post('/users/authenticate')
    .send({})
    .end((err, res) => {
      t.notOk(res.body.success)
      t.equal(res.body.message, 'User not found.')
      t.end()
    })
})

libs.test('/POST authenticate user (wrong JSON keys)', (t) => {
  libs.supertest(localServer)
    .post('/users/authenticate')
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
    .post('/users/authenticate')
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
    .post('/users/authenticate')
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

libs.test.onFinish(() => process.exit(0))
