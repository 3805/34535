var mongoose = require('mongoose')

var Schema = mongoose.Schema

var Task = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  boardId: { type: Number, required: true },

  include: { type: Array, default: [] },

  title: { type: String, required: true },
  description: { type: String },
  progress: { type: Number, default: 0},

  urgent: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },

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
