module.exports = function(deps) {

  var router = deps.service.express.Router()
  var schemaTask = require('../models').Task

  router.get('/', (req, res) => {
    var Task = deps.connection.model('Task', schemaTask);
    return Task.find({}, (err, data) => {
      if (err) {
        return res.json(deps.actions.fail(err))
      }
      res.json(deps.actions.success(data))
    })
  })

  router.post('/new', (req, res) => {
    var taskSchema = deps.service.mongoose.model('Task', schemaTask)

    var task = new taskSchema({
      userId: req.body.userId,
      boardId: req.body.boardId,

      include: req.body.include,

      title: req.body.title,
      description: req.body.description,
      progress: req.body.progress,

      urgent: req.body.urgent,
      important: req.body.important,
      completed: req.body.completed,
    })

    return task.save((err) => {
      if (err) {
        return res.json(deps.actions.fail(err))
      }
      res.json(deps.actions.success({ message: 'OK' }))
    })

  })

  return router

}
