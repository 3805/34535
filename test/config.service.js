module.exports = {
  token: {
    val: undefined,
    set: function(token) { this.val = token },
    get: function() { return this.val },
  },

  task: {
    id: undefined,
    set: function(taskId) { this.id = taskId },
    get: function() { return this.id },
  }
}
