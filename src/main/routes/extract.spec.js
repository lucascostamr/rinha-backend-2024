const app = require('../config/app')
const request = require('supertest')
const MongoHelper = require('../../infra/database/mongo/helpers/mongo-helper')

describe('Extract Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URI)
  })

  beforeEach( async () => {
      const clientCollection = MongoHelper.getCollection('clients')
      await clientCollection.insertOne({
          id: 1,
          limite: 1,
          saldo_inicial: 0,
          ultimas_transacoes:[]
      })
  })

  afterEach(async () => {
      const clientCollection = MongoHelper.getCollection('clients')
      await clientCollection.deleteMany({})
  })

  afterAll(async () => {
      await MongoHelper.disconnect()
  })

  test('Should return extract on success', async () => {
    const response = await request(app)
    .get('/api/clientes/1/extrato')
    
    expect(response.statusCode).toBe(200)
  })
});