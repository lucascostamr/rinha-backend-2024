const bodyParser = require('../middlewares/body-parser')

module.exports = (app) => {
  app.use(bodyParser)
}