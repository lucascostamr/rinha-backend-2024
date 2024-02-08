const TransactionController = require('./trasaction.js')

const makeAddTransactionRepository = () => {
    class AddTransactionRepositoryStub {
        async add() {
            return new Promise(resolve => resolve('Transaction added'))
        }
    }
    return new AddTransactionRepositoryStub()
}

const makeFakeRequest = () => ({
    valor: "any_valor",
    tipo: "any_tipo",
    descricao: "descricao"
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
    test('Should return 400 if valor is not provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            tipo: "any_tipo",
            descricao: "any_descricao"
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse).toBe(400)
    })

    test('Should return 400 if tipo is not provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            valor: "any_valor",
            descricao: "any_descricao"
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse).toBe(400)
    })

    test('Should return 400 if descricao is not provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            valor: "any_valor",
            tipo: "any_tipo"
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse).toBe(400)
    })
    
    test('Should call AddTransactionRepository with correct values', () => {
        const { sut, addTransactionRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')
        sut.handle(makeFakeRequest())
        expect(addSpy).toHaveBeenCalledWith(makeFakeRequest())
    })
});