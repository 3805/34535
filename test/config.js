module.exports = (libs) => {
  process.env.NODE_ENV = 'test'

  libs.test.createStream()
    .pipe(libs.tapeSpec())
    .pipe(process.stdout)
}
