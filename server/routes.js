module.exports = function(app, service) {
  var router = service.express.Router()
  var schema = require('./models')

  app.get('/', (req, res) => res.send('OK ROUTES'))

  app.get('/tasks', (req, res) => {
    var connection = service.mongoose.createConnection(require('./mongo').dbUrl);
    var Task = connection.model('Task', schema.Task);
    Task.find({}, (err, data) => res.json(data))
  })

  app.post('/add', (req, res) => {
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

    task.save((err) => err ? res.send(err) : res.send(obj))
  })

}
