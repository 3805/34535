// module.exports = (libs, localServer) => {
//
//   libs.test('/GET tasks', (t) => {
//     libs.supertest(localServer)
//       .get('/tasks')
//       .expect(200)
//       .end((err, res) => {
//         t.equal(typeof res, 'object')
//         t.end()
//       })
//   })
//
//   libs.test('/POST tasks/new', (t) => {
//     libs.supertest(localServer)
//       .post('/tasks/new')
//       .send({})
//       .end((err, res) => {
//         t.equal(typeof res, 'object')
//         t.end()
//       })
//   })
//
// }

module.exports = (localServer) =>
  (libs) => {

    libs.test('/GET tasks', (t) => {
      libs.supertest(localServer)
      .get('/tasks')
      .expect(200)
      .end((err, res) => {
        t.equal(typeof res, 'object')
        t.end()
      })
    })

    libs.test('/POST tasks/new', (t) => {
      libs.supertest(localServer)
      .post('/tasks/new')
      .send({})
      .end((err, res) => {
        t.equal(typeof res, 'object')
        t.end()
      })
    })
  }
