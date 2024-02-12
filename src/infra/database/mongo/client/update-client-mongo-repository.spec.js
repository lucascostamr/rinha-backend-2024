const MissingParamError = require('../../../../errors/missing-param-error');
const MongoHelper = require('../helpers/mongo-helper');
const UpdateClientRepository = require('./update-client-mongo-repository');

describe('Update Client Mongo Repository', () => {
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
  
  test('Should throw if no client is provided', async () => {
    const sut = new UpdateClientRepository()
    const response = sut.update()
    await expect(response).rejects.toThrow(new MissingParamError('client'))
  })
});