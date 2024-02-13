const app = require('../config/app')
const request = require('supertest')

describe('Body', () => {
  test('Should parse to json', () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    request(app)
    .post('/test_body_parser')
    .send({ name: "any_name" })
    .expect({ name: "any_name" })
  })
});