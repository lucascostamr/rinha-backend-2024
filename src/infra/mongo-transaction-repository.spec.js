const MongoHelper = require('./helpers/mongo-helper')
const MongoTransactioRepository = require('./mongo-transaction-repository')

const makeFakeTransaction = () => ({
    client_id: 1,
    valor: 0,
    tipo: "c",
    descricao: "descricao"
})

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
    test('Should return status on success', async () => {
        const sut = new MongoTransactioRepository()

        const response = await sut.make(makeFakeTransaction())

        expect(response).toEqual({
            limite : 100000,
            saldo : 0
        })
    })
});