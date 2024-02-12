const TransactionError = require('../../../errors/transaction-error')
const MakeTransaction = require('./make-transaction')

const makeAddRepository = () => {
    class ClientRepositoryStub {
        async get () {
            return new Promise(resolve => resolve(makeFakeClient()))
        }
    }
    return new ClientRepositoryStub()
}

const makeSaveTransaction = () => {
    class UpdateClientRepositoryStub {
        async save () {
            return new Promise(resolve => resolve({
                id: 1,
                limite: 1,
                saldo: 0
            }))
        }
    }
    return new UpdateClientRepositoryStub()
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
    const updateClientRepositoryStub = makeSaveTransaction()
    const sut = new MakeTransaction(clientRepositoryStub, updateClientRepositoryStub)
    return {
        sut,
        clientRepositoryStub,
        updateClientRepositoryStub
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

    test('Should throw if no transaction is provided', async () => {
        const { sut } = makeSut()
        const response = sut.make({})
        await expect(response).rejects.toThrow(new Error())
    })

    test('Should throw if MakeTransaction saldo will be below limite', async () => {
        const { sut } = makeSut()
        const response = sut.make({
            client_id: 1,
            valor: 2,
            tipo: "d",
            descricao: "descricao"
        })
        await expect(response).rejects.toThrow(new TransactionError('Transaction below limit'))
    })

    test('Should call SaveTransaction with correct values', async () => {
        const { sut, updateClientRepositoryStub } = makeSut()
        const saveSpy = jest.spyOn(updateClientRepositoryStub, 'save')
        await sut.make(makeFakeTransaction())
        expect(saveSpy).toHaveBeenCalledWith({
            id: 1,
            saldo: 0,
            limite: 0
        })
    })

    test('Should return status on success', async () => {
        const { sut } = makeSut()
        const response = await sut.make(makeFakeTransaction())
        expect(response).toEqual(makeFakeStatus())
    })
});