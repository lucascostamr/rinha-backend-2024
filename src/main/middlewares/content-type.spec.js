const request = require('supertest')
const app = require('../config/app')

describe('Content Type', () => {
  test('Should return content-type json as default', async () => {
    app.get('/test_content_type_json', (req, res) => {
      res.send('')
    })
    await request(app)
    .get('/test_content_type_json')
    .expect('Content-Type', /json/)
  })

  test('Should return content-type xml if forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
    .get('/test_content_type_xml')
    .expect('Content-Type', /xml/)
  })
});