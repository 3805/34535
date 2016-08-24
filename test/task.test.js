
module.exports = (localServer) =>
  (libs) => {

    var service = require('./config.service')

    libs.test('/GET tasks', (t) => {
      libs.supertest(localServer)
        .get('/tasks')
        .expect(200)
        .end((err, res) => {
          t.equal(typeof res, 'object')
          service.task.set(res.body.data[0]._id)
          t.end()
        })
    })

    libs.test('/POST tasks/new (empty)', (t) => {
      libs.supertest(localServer)
        .post('/tasks/new').send({})
        .end((err, res) => {
          t.equal(typeof res, 'object')
          t.notOk(res.body.success)
          t.end()
        })
    })

    libs.test('/POST tasks/new (success)', (t) => {
      libs.supertest(localServer)
        .post('/tasks/new').send({
          userId: 11,
          boardId: 11,
          title: 'BOBOPE IS HAPPY',
        })
        .end((err, res) => {
          t.equal(typeof res.body.data._id, 'string')
          t.ok(res.body.success)
          t.end()
        })
    })

    libs.test('/PATCH tasks/:id (Wrong id)', (t) => {
      libs.supertest(localServer)
        .patch('/tasks/12445').send({
          title: 'TEST - new title'
        })
        .end((err, res) => {
          t.notOk(res.body.success)
          t.end()
        })
    })

    libs.test('/PATCH tasks/:id (no id)', (t) => {
      libs.supertest(localServer)
        .patch('/tasks/').send({
          title: 'TEST - new title',
          userId: 1,
          boardId: 1,
        })
        .end((err, res) => {
          t.notOk(res.body.success)
          t.end()
        })
    })

    libs.test('/PATCH tasks/:id (no required field)', (t) => {
      libs.supertest(localServer)
        .patch('/tasks/').send({
          title: 'TEST - new title',
          boardId: 1,
        })
        .end((err, res) => {
          t.notOk(res.body.success)
          t.end()
        })
    })

    libs.test('/PUT tasks/:id (success)', (t) => {
      libs.supertest(localServer)
        .patch('/tasks/' + service.task.get()).send({
          title: 'TEST - new title',
          userId: 1,
          boardId: 1,
        })
        .end((err, res) => {
          t.ok(res.body.success)
          t.end()
        })
    })
  }
