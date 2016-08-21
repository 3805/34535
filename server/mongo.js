module.exports = {
  dbUrl: () => 'mongodb://localhost/' + (process.env.NODE_ENV || 'test'),
  secret: 'mommijilebiggestbebiisaballofbebiness'
}
