const TransactionController = require('./trasaction.js')

describe('Transaction Controller', () => {
    test('Should return 400 if valor is not provided', () => {
        const sut = new TransactionController()

        const httpRequest = {
            tipo: "any_tipo",
            descricao: "any_descricao"
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse).toBe(400)
    })

    test('Should return 400 if tipo is not provided', () => {
        const sut = new TransactionController()

        const httpRequest = {
            valor: "any_valor",
            descricao: "any_descricao"
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse).toBe(400)
    })

    test('Should return 400 if descricao is not provided', () => {
        const sut = new TransactionController()

        const httpRequest = {
            valor: "any_valor",
            tipo: "any_tipo"
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse).toBe(400)
    })
    
    test('Should call AddTrasactionRepository with correct values', () => {
        class AddTransactionRepositoryStub {
            async add() {
                return new Promise(resolve => resolve('Transaction added'))
            }
        }
        
        const addTransactionRepositoryStub = new AddTransactionRepositoryStub()
        const sut = new TransactionController(addTransactionRepositoryStub)

        const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')

        const httpRequest = {
            valor: "any_valor",
            tipo: "any_tipo",
            descricao: "descricao"
        }

        sut.handle(httpRequest)

        expect(addSpy).toHaveBeenCalledWith({
            valor: "any_valor",
            tipo: "any_tipo",
            descricao: "descricao"
        })
    })
});