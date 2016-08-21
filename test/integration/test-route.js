var supertest = require('supertest')
var assert = require('assert')
var app = require('../../shell')

var createServicesSpies = () => ({
  mongoose: sinon.spy(),
  express: sinon.stub(),
  bodyParser: sinon.spy(),
})

exports.path_tasks_should_exist = (done) => {
  supertest(app(createServicesSpies))
    .get('/tasks')
    .expect(200)
    .end(done)
}

exports.tasks_should_return_an_array = (done) => {
  supertest(app(createServicesSpies))
    .get('/tasks')
    .end(done)
}
