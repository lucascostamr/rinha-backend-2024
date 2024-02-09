const MakeTransaction = require('./make-transaction')

const makeAddRepository = () => {
    class ClientRepositoryStub {
        async get () {
            return new Promise(resolve => resolve(makeFakeClient()))
        }
    }
    return new ClientRepositoryStub()
}

const makeFakeTransaction = () => ({
    client_id: 1,
    valor: 1,
    tipo: "c",
    descricao: "descricao"
})

const makeFakeClient = () => ({
    _id: 1,
    id: 1,
    limite: 1,
    saldo_inicial: 0
})

const makeFakeStatus = () => ({
    limite: 0,
    saldo: 0
})

const makeSut = () => {
    const clientRepositoryStub = makeAddRepository()
    const sut = new MakeTransaction(clientRepositoryStub)
    return {
        sut,
        clientRepositoryStub
    }
}

describe('Make Transaction Repository', () => {
    test('Should call clientRepository with correct values', async () => {
        const { sut, clientRepositoryStub } = makeSut()
        const makeSpy = jest.spyOn(clientRepositoryStub, 'get')
        await sut.make(makeFakeTransaction())
        expect(makeSpy).toHaveBeenCalledWith(makeFakeTransaction().client_id)
    })

    test('Should throw if clientRepository throws', async () => {
        const { sut, clientRepositoryStub } = makeSut()
        jest.spyOn(clientRepositoryStub, 'get').mockRejectedValueOnce(new Error())
        const response = sut.make(makeFakeTransaction())
        await expect(response).rejects.toThrow(new Error())
    })

    test('Should return status on success', async () => {
        const { sut } = makeSut()
        const response = await sut.make(makeFakeTransaction())
        expect(response).toEqual(makeFakeStatus())
    })
});