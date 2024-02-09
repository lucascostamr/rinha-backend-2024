const MongoHelper = require('../helpers/mongo-helper')
const GetClientMongoRepository = require('./get-client-mongo-repository')

describe('Mongo Transaction Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URI)
        const clientCollection = MongoHelper.getCollection('clients')
        await clientCollection.insertOne({
            id: 1,
            limite: 100000,
            saldo_inicial: 0
        })
    })
    
    afterAll(async () => {
        const clientCollection = MongoHelper.getCollection('clients')
        await clientCollection.deleteMany({})
        await MongoHelper.disconnect()
    })

    test('Should return a client on success', async () => {
        const sut = new GetClientMongoRepository()
        const clientId = 1
        const client = await sut.get(clientId)
        expect(client.id).toBe(1)
    })
});