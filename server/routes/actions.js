var success = (data) => ({
  success: true,
  data,
})

var fail = (data) => ({
  success: false,
  data,
})

module.exports = {
  success: success,
  fail: fail,
}
