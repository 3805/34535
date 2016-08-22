
var urlInjector = (url) => (f) => f(url)

var libsInjector = (libs) => (f) => f(libs)

var loadTests = (unitTest, tests) => {
  tests.forEach((test) => unitTest(test))
}

// var testDependencies = (libs, serverUrl) =>
//   (test) =>
//     require(`./${test}.test`)(libs, serverUrl)

var shell = () => {
  var libs = require('./config.libs')
  var app = require('../shell')
  var serverUrl = require('./config.url')

  var injectLibs = libsInjector(libs)

  injectLibs(require('./config'))
  app(injectLibs(require('./config.spies')))

  var injectUrl = urlInjector('http://localhost:8080')
  injectLibs(injectUrl(require('./task.test')))


  // var taskTest = injectLibs(require('./task.test'))
  // taskTest(serverUrl)

  // var unitTest = testDependencies(libs, serverUrl)
  //
  // loadTests(unitTest, [
  //   'task',
  //   'user',
  // ])

  libs.test.onFinish(() => process.exit(0))
}

shell()
