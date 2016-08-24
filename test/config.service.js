module.exports = {
  token: {
    val: undefined,
    set: function(token) { this.val = token },
    get: function() { return this.val },
  },

  task: {
    id: undefined,
    set: function(id) { this.taskId = id },
    get: function() { return this.taskId },
  }
}
