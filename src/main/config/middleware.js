const bodyParser = require('../middlewares/body-parser')
const cors = require('../middlewares/cors')
const contentType = require('../middlewares/content-type')

module.exports = (app) => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}