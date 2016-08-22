module.exports = function(app, service, connection) {

  var router = service.express.Router()
  var schemaTask = require('../models').Task

  router.get('/', (req, res) => {
    var Task = connection.model('Task', schemaTask);
    return Task.find({}, (err, data) => res.json(data))
  })

  router.post('/new', (req, res) => {
    var taskSchema = service.mongoose.model('Task', schemaTask)

    var task = new taskSchema({
      userId: req.body.userId,
      board_id: req.body.boardId,

      include: req.body.include,

      title: req.body.title,
      description: req.body.description,
      progress: req.body.progress,

      urgent: req.body.urgent,
      important: req.body.important,
      completed: req.body.completed,
    })

    task.save((err) => {
      if (err) {
        return res.json(err)
      }
      res.json({ message: 'OK' })
    })

  })

  return router

}
