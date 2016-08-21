module.exports = (libs) => ({
  mongoose: libs.sinon.stub(),
  express: libs.sinon.stub(),
  bodyParser: libs.sinon.spy(),
})
