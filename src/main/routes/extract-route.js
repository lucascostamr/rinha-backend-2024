const adaptRoute = require('../adapters/express')
const makeExtractController = require('../factories/extract')

module.exports = (router) => {
  router.get('/clientes/:id/extrato', adaptRoute(makeExtractController()))
}