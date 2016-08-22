var libs = require('./config.libs')
var app = require('../shell')
var options = require('./config.options')

var injector = (thing) => (f) => f(thing)

var injectLibs = injector(libs)
var injectServerUrl = injector(options.serverUrl)

var shell = () => {

  injectLibs(require('./config'))
  app(injectLibs(require('./config.spies')))

  var loadTests = (tests) =>
    tests.forEach((test) =>
      injectLibs(injectServerUrl(require(`./${test}.test`))))

  loadTests(options.tests)

  libs.test.onFinish(() => process.exit(0))
}

shell()
