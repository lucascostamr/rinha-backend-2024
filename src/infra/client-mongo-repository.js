const MongoHelper = require('./helpers/mongo-helper')

class ClientMongoRepository {
    async get(clientId) {
        const clientCollection = MongoHelper.getCollection('clients')
        const client = await clientCollection.findOne({ id: clientId })
        return client
    }
}

module.exports = ClientMongoRepository