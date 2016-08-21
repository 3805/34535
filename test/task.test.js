process.env.NODE_ENV = 'test'

var supertest = require('supertest')
var sinon = require('sinon')
var test = require('tape')
var tapeSpec = require('tap-spec')

var app = require('../shell')

test.createStream()
  .pipe(tapeSpec())
  .pipe(process.stdout)

var createServicesSpies = () => ({
  mongoose: sinon.stub(),
  express: sinon.stub(),
  bodyParser: sinon.spy(),
})

app(createServicesSpies())

var localServer = 'http://localhost:8080'

test('/GET tasks', (t) => {
  supertest(localServer)
    .get('/tasks')
    .expect(200)
    .end((err, res) => {
      t.equal(typeof res, 'object')
      t.end()
    })
})

test('/POST tasks/new', (t) => {
  supertest(localServer)
    .post('/tasks/new')
    .send({})
    .end((err, res) => {
      t.equal(Object.keys(res.body[0]).length, 1)
      t.end()
    })
})

test.onFinish(() => process.exit(0))
