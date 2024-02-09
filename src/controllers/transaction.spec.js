const TransactionController = require('./trasaction.js')

const makeSaveTransaction = () => {
    class SaveTransactionStub {
        async save() {
            return new Promise(resolve => resolve(makeFakeRequest().body))
        }
    }

    return new SaveTransactionStub()
}

const makeMakeTransaction = () => {
    class MakeTransactionStub {
        async make() {
            return new Promise(resolve => resolve(makeFakeStatus()))
        }
    }
    return new MakeTransactionStub()
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
    const makeTransactionStub = makeMakeTransaction()
    const saveTransactionStub = makeSaveTransaction()
    const sut = new TransactionController(makeTransactionStub, saveTransactionStub)
    return {
        sut,
        makeTransactionStub,
        saveTransactionStub
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
        expect(httpResponse.statusCode).toBe(400)
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
        expect(httpResponse.statusCode).toBe(400)
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
        expect(httpResponse.statusCode).toBe(400)
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
        expect(httpResponse.statusCode).toBe(400)
    })
    
    test('Should call MakeTransaction with correct values', async () => {
        const { sut, makeTransactionStub } = makeSut()
        const makeSpy = jest.spyOn(makeTransactionStub, 'make')
        await sut.handle(makeFakeRequest())
        expect(makeSpy).toHaveBeenCalledWith(makeFakeRequest().body)
    })

    test('Should return 500 if MakeTransaction throws', async () => {
        const { sut, makeTransactionStub } = makeSut()
        jest.spyOn(makeTransactionStub, 'make').mockRejectedValueOnce(new Error())
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call SaveTransaction with correct values', async () => {
        const { sut, saveTransactionStub } = makeSut()
        const saveSpy = jest.spyOn(saveTransactionStub, 'save')
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