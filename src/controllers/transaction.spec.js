const { badRequest, serverError, transactionError, clientNotFoundError } = require('../helpers/http')
const { TransactionError, ClientNotFoundError, MissingParamError } = require('../errors/index')
const TransactionController = require('./transaction.js')

const makeAddTransactionRepository = () => {
    class SaveTransactionModelStub {
        async add() {
            return new Promise(resolve => resolve(makeFakeRequest().body))
        }
    }
    return new SaveTransactionModelStub()
}

const makeMakeTransactionModel = () => {
    class makeTransactionModelStub {
        async make() {
            return new Promise(resolve => resolve(makeFakeStatus()))
        }
    }
    return new makeTransactionModelStub()
}

const makeFakeStatus = () => ({
    limite : "any_limite",
    saldo : "any_saldo"
})

const makeFakeRequest = () => ({
    body: {
        client_id: "any_id",
        valor: "any_valor",
        tipo: "any_tipo",
        descricao: "descricao"
    }
})

const makeSut = () => {
    const makeTransactionModelStub = makeMakeTransactionModel()
    const addTransactionRepositoryStub = makeAddTransactionRepository()
    const sut = new TransactionController(makeTransactionModelStub, addTransactionRepositoryStub)
    return {
        sut,
        makeTransactionModelStub,
        addTransactionRepositoryStub
    }
}

describe('Transaction Controller', () => {
    test('Should return 400 if client_id is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                valor: "any_valor",
                tipo: "any_tipo",
                descricao: "any_descricao"
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('client_id')))
    })

    test('Should return 400 if valor is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                client_id: "any_id",
                tipo: "any_tipo",
                descricao: "any_descricao"
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('valor')))
    })

    test('Should return 400 if tipo is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                client_id: "any_id",
                valor: "any_valor",
                descricao: "any_descricao"
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('tipo')))
    })

    test('Should return 400 if descricao is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                client_id: "any_id",
                valor: "any_valor",
                tipo: "any_tipo"
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('descricao')))
    })
    
    test('Should call MakeTransactionModel with correct values', async () => {
        const { sut, makeTransactionModelStub } = makeSut()
        const makeSpy = jest.spyOn(makeTransactionModelStub, 'make')
        await sut.handle(makeFakeRequest())
        expect(makeSpy).toHaveBeenCalledWith(makeFakeRequest().body)
    })

    test('Should return 422 if MakeTransactionModel catch TransactionError', async () => {
        const { sut, makeTransactionModelStub } = makeSut()
        jest.spyOn(makeTransactionModelStub, 'make').mockRejectedValueOnce(new TransactionError())
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(transactionError().statusCode)
    })

    test('Should return 500 if MakeTransactionModel throws', async () => {
        const { sut, makeTransactionModelStub } = makeSut()
        jest.spyOn(makeTransactionModelStub, 'make').mockRejectedValueOnce(new Error())
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError())
    })

    test('Should return 404 if MakeTransactionModel catch ClientNotFoundError', async () => {
        const { sut, makeTransactionModelStub } = makeSut()
        jest.spyOn(makeTransactionModelStub, 'make').mockRejectedValueOnce(new ClientNotFoundError())
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(clientNotFoundError().statusCode)
    })

    test('Should call SaveTransactionModel with correct values', async () => {
        const { sut, addTransactionRepositoryStub } = makeSut()
        const saveSpy = jest.spyOn(addTransactionRepositoryStub, 'add')
        await sut.handle(makeFakeRequest())
        expect(saveSpy).toHaveBeenCalledWith(makeFakeRequest().body)
    })

    test('Should return status on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual(makeFakeStatus())
    })
});