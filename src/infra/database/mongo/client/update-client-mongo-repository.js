const MissingParamError = require('../../../../errors/missing-param-error')
const MongoHelper = require('../helpers/mongo-helper')

class UpdateClientRepository {
    async update(client) {
        if(!client) return new Promise((resolve, reject) => reject(new MissingParamError('client')))
        // const clientCollection = MongoHelper.getCollection('clients')
        // const client = await clientCollection.findOne({ id: clientId })
        // if(!client) throw new ClientNotFoundError(clientId)
        return new Promise(resolve => resolve({ matchedCount: 1}))
    }
}

module.exports = UpdateClientRepository