const AddTransactionMongoRepository = require('./add-transaction-mongo-repository')
const MongoHelper = require('../helpers/mongo-helper')

describe('Add Transaction Repository', () => {
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

  test('Should return last transactions on success', async () => {
    const sut = new AddTransactionMongoRepository()
    const response = await sut.add({
      client_id: 1,
      valor: 'any_value',
      tipo: 'any_tipo',
      descricao: 'any_descricao',
    })
    expect(response.id).toBe(1)
    expect(response.ultimas_transacoes[0].valor).toBe('any_value')
    expect(response.ultimas_transacoes[0].tipo).toBe('any_tipo')
    expect(response.ultimas_transacoes[0].descricao).toBe('any_descricao')
    expect(response.ultimas_transacoes[0].realizada_em).toBeTruthy()
  })
});