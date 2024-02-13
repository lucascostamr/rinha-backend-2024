const adaptRoute = require('../adapters/express')
const makeTransactionController = require('../factories/transaction')

module.exports = (router) => {
  router.post('/clientes/:id/transacoes', adaptRoute(makeTransactionController()))
}