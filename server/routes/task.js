module.exports = function(app, service) {

  var router = service.express.Router()
  var schema = require('../models')

  router.get('/', (req, res) => {
    var mongoDB = require('../mongo').dbUrl;
    var connection = service.mongoose.createConnection(mongoDB);
    var Task = connection.model('Task', schema.Task);
    return Task.find({}, (err, data) => res.json(data))
  })

  router.post('/new', (req, res) => {
    var taskSchema = service.mongoose.model('Task', schema.Task)

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

    return task.save((err) => {
      if (err) {
        return res.send(err)
      }
      return res.json(obj)
    })

  })

  return router

}
