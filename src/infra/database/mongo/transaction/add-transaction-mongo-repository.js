const MongoHelper = require('../helpers/mongo-helper')

class AddTransactionMongoRepository {
  async add (transaction) {
    const { client_id, ...noClientId } = transaction
    const clientCollection = MongoHelper.getCollection('clients')
    const datedTransaction = Object.assign({}, noClientId, { realizada_em: new Date() })
    await clientCollection.updateOne({ id: client_id }, { $push: { ultimas_transacoes: datedTransaction }})
    return await clientCollection.findOne({ id: client_id })
  }
}
module.exports = AddTransactionMongoRepository