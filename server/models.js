var mongoose = require('mongoose')

var Schema = mongoose.Schema

var Task = new Schema({
  userId: { type: Number, required: true },
  boardId: { type: Number, required: true },

  title: { type: String, required: true },
  notes: { type: Array },
  progress: { type: Number, default: 0},
  priotity: { type: Number, default: 0 },
  include: { type: Array, default: [] },

  createdAt: { type: Date, default: Date.now() },
})

var User = new Schema({
  username: { type: String, },
  email: { type: String, required: true },
  password: { type: String, required: true},
  createdAt: { type: Date, default: Date.now() },
})

module.exports = {
  Task: Task,
  User: User,
}
