const TransactionController = require('../../controllers/transaction')
const MakeTransactionModel = require('../../model/data/transaction/make-transaction')
const GetClientMongoRepository = require('../../infra/database/mongo/client/get-client-mongo-repository')
const UpdateClientMongoRepository = require('../../infra/database/mongo/client/update-client-mongo-repository')
const AddTransactionMongoRepository = require('../../infra/database/mongo/transaction/add-transaction-mongo-repository')

const makeTransactionController = () => {
  const addTransactionMongoRepository = new AddTransactionMongoRepository()
  const getClientMongoRepository = new GetClientMongoRepository()
  const updateClientMongoRepository = new UpdateClientMongoRepository()
  const makeTransactionModel = new MakeTransactionModel(getClientMongoRepository, updateClientMongoRepository)
  return new TransactionController(makeTransactionModel, addTransactionMongoRepository)
}

module.exports = makeTransactionController