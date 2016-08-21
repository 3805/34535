process.env.NODE_ENV = 'test'

var mongoose = require('mongoose')
var Task = require('../models').Task

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app')
var should = chai.should()

chai.use(chaiHttp)

describe('Tasks', () => {
  beforeEach((done) => {
    Task.remove({}, (err,res) => {
      done()
    })
  })

  describe('/GET task', () => {
    it('should GET all the tasks', (done) => {
      chai.request(server)
        .get('/tasks')
        .end((err, res) => {

          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })
})
