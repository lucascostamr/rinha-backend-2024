const MongoHelper = require('../helpers/mongo-helper')
const ClientNotFoundError = require('../../../../errors/client-not-found')
const MissingParamError = require('../../../../errors/missing-param-error')

class GetClientMongoRepository {
    async get(clientId) {
        if(!clientId) throw new MissingParamError('clientId')
        const clientCollection = MongoHelper.getCollection('clients')
        const client = await clientCollection.findOne({ id: clientId })
        if(!client) throw new ClientNotFoundError(clientId)
        return client
    }
}

module.exports = GetClientMongoRepository