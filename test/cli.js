module.exports = () => {
  var libs = require('./config.libs')
  var app = require('../shell')
  var localServer = require('./config.url')

  require('./config')(libs)
  app(require('./config.spies')(libs))

  

  libs.test.onFinish(() => process.exit(0))

}
