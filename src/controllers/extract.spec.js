const { ClientNotFoundError, MissingParamError }  = require('../errors/index')
const { clientNotFoundError, serverError, ok, badRequest } = require('../helpers/http')
const ExtractController = require('./extract')

const makeGetClientRepository = () => {
  class GetClientRepositoryStub {
    async get(clientId) {
      return new Promise(resolve => resolve('client')) 
    }
  }
  return new GetClientRepositoryStub()
}

const makeMountExtract = () => {
  class MountExtractStub {
    async mount () {
      return new Promise(resolve => resolve('extract'))
    }
  }
  return new MountExtractStub()
}

const makeFakeRequest = () => ({
  body: {
    client_id: 'any_id'
  }
})

const makeSut = () => {
  const mountExtractStub = makeMountExtract()
  const getClientRepositoryStub = makeGetClientRepository()
  const sut = new ExtractController(getClientRepositoryStub, mountExtractStub)
  return {
    sut,
    getClientRepositoryStub,
    mountExtractStub
  }
}
describe('Extract Controller', () => {
  test('Should return 400 if no client_id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('client_id')))
  })

  test('Should call getClientRepository with correct client_id', async () => {
    const { sut, getClientRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getClientRepositoryStub, 'get')
    await sut.handle(makeFakeRequest())
    expect(getSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 404 if getClientRepository throws', async () => {
    const { sut, getClientRepositoryStub } = makeSut()
    jest.spyOn(getClientRepositoryStub, 'get').mockRejectedValueOnce(new ClientNotFoundError())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(clientNotFoundError(new ClientNotFoundError()))
  })

  test('Should call MountExtract with correct values', async () => {
    const { sut, mountExtractStub } = makeSut()
    const mountSpy = jest.spyOn(mountExtractStub, 'mount')
    await sut.handle(makeFakeRequest())
    expect(mountSpy).toHaveBeenCalledWith('client')
  })

  test('Should return 500 if MountExtract throws', async () => {
    const { sut, mountExtractStub } = makeSut()
    jest.spyOn(mountExtractStub, 'mount').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok('extract'))
  })
});