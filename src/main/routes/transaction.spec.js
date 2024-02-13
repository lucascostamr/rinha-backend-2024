const app = require('../config/app')
const request = require('supertest')
const MongoHelper = require('../../infra/database/mongo/helpers/mongo-helper')

describe('Transaction Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URI)
  })

  beforeEach( async () => {
      const clientCollection = MongoHelper.getCollection('clients')
      await clientCollection.insertOne({
          id: 1,
          limite: 1,
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

  test('Should return status on success', async () => {
      await request(app)
      .post('/api/clientes/1/transacoes')
      .send({
        valor: 1,
        tipo: 'c',
        descricao: 'qualquer descricao',
      })
      .expect({
        limite: 0,
        saldo: 0
      })
  })
});