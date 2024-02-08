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
});