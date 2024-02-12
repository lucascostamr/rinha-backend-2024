const ClientNotFoundError = require('../../../../errors/client-not-found');
const MissingParamError = require('../../../../errors/missing-param-error');
const MongoHelper = require('../helpers/mongo-helper')
const GetClientMongoRepository = require('./get-client-mongo-repository')

describe('Mongo Transaction Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URI)
    })
    
    beforeEach( async () => {
        const clientCollection = MongoHelper.getCollection('clients')
        await clientCollection.insertOne({
            id: 1,
            limite: 100000,
            saldo_inicial: 0
        })
    })
    
    afterEach(async () => {
        const clientCollection = MongoHelper.getCollection('clients')
        await clientCollection.deleteMany({})
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    test('Should throw if no id is provided', async () => {
        const sut = new GetClientMongoRepository()
        const client = sut.get()
        await expect(client).rejects.toThrow(new MissingParamError('clientId'))
    })

    test('Should throw if no client found', async () => {
        const sut = new GetClientMongoRepository()
        const clientId = 2
        const client = sut.get(clientId)
        await expect(client).rejects.toThrow(new ClientNotFoundError(clientId))
    })

    test('Should return a client on success', async () => {
        const sut = new GetClientMongoRepository()
        const clientId = 1
        const client = await sut.get(clientId)
        expect(client.id).toBe(1)
    })
});