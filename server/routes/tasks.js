
module.exports = function(deps) {

  var schemaTask = require('../models').Task

  var router = deps.service.express.Router()

  router.get('/', (req, res) => {
    var Task = deps.connection.model('Task', schemaTask);
    Task.find({}, (err, data) => {
      if (err) {
        return res.json(deps.actions.fail(err))
      }
      res.json(deps.actions.success(data))
    })
  })

  router.post('/new', (req, res) => {
    var Task = deps.service.mongoose.model('Task', schemaTask)

    var task = new Task({
      userId     : req.body.userId,
      boardId    : req.body.boardId,
      include    : req.body.include,
      title      : req.body.title,
      description: req.body.description,
      progress   : req.body.progress,
      urgent     : req.body.urgent,
      important  : req.body.important,
      completed  : req.body.completed,
    })

    task.save((err) => {
      if (err) {
        return res.json(deps.actions.fail(err))
      }
      res.json(deps.actions.success({ data: 'OK' }))
    })

  })

  router.delete('/:id', (req, res) => {
    var Task = deps.service.mongoose.model('Task', schemaTask)

    Task.remove({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.json(deps.actions.fail(err))
      }
      return res.json(deps.actions.success({ message: 'Task successfully deleted.' }))
    })
  })

  return router

}
