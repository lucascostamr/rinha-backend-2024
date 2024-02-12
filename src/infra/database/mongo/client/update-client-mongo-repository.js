const MissingParamError = require('../../../../errors/missing-param-error')
const MongoHelper = require('../helpers/mongo-helper')

class UpdateClientRepository {
    async update(client) {
        if(!client) return new Promise((resolve, reject) => reject(new MissingParamError('client')))
        const { id, limite, saldo } = client
        const clientCollection = MongoHelper.getCollection('clients')
        return await clientCollection.updateOne({ id: id }, { $set: { limite: limite, saldo_inicial: saldo }})
    }
}

module.exports = UpdateClientRepository