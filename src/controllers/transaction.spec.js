const TransactionController = require('./trasaction.js')

const makeAddTransactionRepository = () => {
    class AddTransactionRepositoryStub {
        async add() {
            return new Promise(resolve => resolve(makeFakeStatus()))
        }
    }
    return new AddTransactionRepositoryStub()
}

const makeFakeStatus = () => ({
    "limite" : 100000,
    "saldo" : -9098
})

const makeFakeRequest = () => ({
    body: {
        valor: "any_valor",
        tipo: "any_tipo",
        descricao: "descricao"
    }
})

const makeSut = () => {
    const addTransactionRepositoryStub = makeAddTransactionRepository()
    const sut = new TransactionController(addTransactionRepositoryStub)
    return {
        sut,
        addTransactionRepositoryStub
    }
}

describe('Transaction Controller', () => {
    test('Should return 400 if valor is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                tipo: "any_tipo",
                descricao: "any_descricao"
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 400 if tipo is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                valor: "any_valor",
                descricao: "any_descricao"
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 400 if descricao is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                valor: "any_valor",
                tipo: "any_tipo"
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
    
    test('Should call AddTransactionRepository with correct values', async () => {
        const { sut, addTransactionRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')
        await sut.handle(makeFakeRequest())
        expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body)
    })

    test('Should return 500 if AddTransactionRepository throws', async () => {
        const { sut, addTransactionRepositoryStub } = makeSut()
        jest.spyOn(addTransactionRepositoryStub, 'add').mockRejectedValueOnce(new Error())
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should return status on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual(makeFakeStatus())
    })
});