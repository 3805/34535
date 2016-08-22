module.exports = {
  token: undefined,
  set: function(token) {
    this.token = token
  },
  get: function() {
    return this.token
  }
}
