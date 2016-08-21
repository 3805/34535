var libs = require('./config.libs')
var app = require('../shell')
var localServer = require('./config.url')

require('./config')(libs)
app(require('./config.spies')(libs))

libs.test('/GET tasks', (t) => {
  libs.supertest(localServer)
    .get('/tasks')
    .expect(200)
    .end((err, res) => {
      t.equal(typeof res, 'object')
      t.end()
    })
})

libs.test('/POST tasks/new', (t) => {
  libs.supertest(localServer)
    .post('/tasks/new')
    .send({})
    .end((err, res) => {
      t.equal(typeof res, 'object')
      t.end()
    })
})

libs.test.onFinish(() => process.exit(0))
