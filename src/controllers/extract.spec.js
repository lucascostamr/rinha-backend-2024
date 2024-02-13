const ExtractController = require('./extract')

const makeGetClientRepositoryStub = () => {
  class GetClientRepositoryStub {
    async get(clientId) {
      return new Promise(resolve => resolve('client')) 
    }
  }
  return new GetClientRepositoryStub()
}
const makeSut = () => {
  const getClientRepositoryStub = makeGetClientRepositoryStub()
  const sut = new ExtractController(getClientRepositoryStub)
  return {
    sut,
    getClientRepositoryStub
  }
}
describe('Extract Controller', () => {
  test('Should return 400 if no client_id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should call getClientRepository with correct client_id', async () => {
    const { sut, getClientRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getClientRepositoryStub, 'get')
    const httpRequest = {
      body: {
        client_id: 'any_id'
      }
    }
    await sut.handle(httpRequest)
    expect(getSpy).toHaveBeenCalledWith('any_id')
  })
});