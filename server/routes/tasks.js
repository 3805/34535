
module.exports = function(deps) {

  var schemaTask = require('../models').Task

  var router = deps.service.express.Router()

  var Task = deps.service.mongoose.model('Task', schemaTask)

  router.post('/new', (req, res) => {

    var task = new Task({
      userId   : req.body.userId,
      boardId  : req.body.boardId,
      include  : req.body.include,
      title    : req.body.title,
      notes    : req.body.notes,
      progress : req.body.progress,
      priority : req.body.priority
    })

    return task.save((err) => {
      if (err) {
        return res.json(deps.actions.fail(err))
      }
      res.json(deps.actions.success({ data: 'Saved.' }))
    })

  })

  router.get('/', (req, res) => {
    Task.find({}, (err, data) => {
      if (err) {
        return res.json(deps.actions.fail(err))
      }
      res.json(deps.actions.success(data))
    })
  })

  router.patch('/:id', (req, res) => {
    if (!req.params.id) {
      return res.json(deps.actions.fail({
        data: 'No ID assigned.'
      }))
    }

    Task.findOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.json(deps.actions.fail(err))
      }

      data.boardId  = req.body.boardId
      data.userId   = req.body.userId
      data.include  = req.body.include || undefined
      data.title    = req.body.title
      data.notes    = req.body.notes || undefined
      data.progress = req.body.progress
      data.priority = req.body.priority

      data.save((err) => {
        if (err) {
          return res.json(deps.actions.fail(err))
        }
        res.json(deps.actions.success(data))
      })
    })

  })

  router.delete('/:id', (req, res) => {
    Task.remove({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.json(deps.actions.fail(err))
      }
      return res.json(deps.actions.success({
        data: 'Task successfully deleted.'
      }))
    })
  })

  return router

}
