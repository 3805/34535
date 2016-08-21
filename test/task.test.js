process.env.NODE_ENV = 'test'

var supertest = require('supertest')
var test = require('tape')
var tapeSpec = require('tap-spec')

test.createStream()
  .pipe(tapeSpec())
  .pipe(process.stdout)

var app = require('../shell')

var createServicesSpies = () => ({
  mongoose: sinon.spy(),
  express: sinon.stub(),
  bodyParser: sinon.spy(),
})

test('/GET task', (t) => {
  supertest(app(createServicesSpies))
    .get('/tasks')
    .expect(200)
    .end((err, res) => {
      t.equal(typeof res, 'object')
      t.end()
    })
})

test.onFinish(() => process.exit(0))
