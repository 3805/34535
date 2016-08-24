
module.exports = (localServer) =>
  (libs) => {

    var service = require('./config.service')

    libs.test('/GET tasks', (t) => {
      libs.supertest(localServer)
        .get('/tasks')
        .expect(200)
        .end((err, res) => {
          t.equal(typeof res, 'object')
          service.task.set = res.body.data[0]._id
          t.end()
        })
    })

    libs.test('/POST tasks/new', (t) => {
      libs.supertest(localServer)
        .post('/tasks/new').send({})
        .end((err, res) => {
          t.equal(typeof res, 'object')
          t.end()
        })
    })

    libs.test('/PUT tasks/:id', (t) => {
      libs.supertest(localServer)
        .put('/tasks').send({
          title: 'TEST - new title'
        })
        .end((err, res) => {
          t.ok(res.body.success)
          t.end()
        })
    })
  }
