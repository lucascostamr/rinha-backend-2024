const AddTransactionRepository = require('./add-transaction-repository')

const makeAddRepository = () => {
    class TransactionRepositoryStub {
        async add () {
            return new Promise(resolve => resolve(''))
        }
    }
    return new TransactionRepositoryStub()
}

const makeFakeTransaction = () => ({
    valor: "any_valor",
    tipo: "any_tipo",
    descricao: "descricao"
})

const makeSut = () => {
    const transactionRepositoryStub = makeAddRepository()
    const sut = new AddTransactionRepository(transactionRepositoryStub)
    return {
        sut,
        transactionRepositoryStub
    }
}

describe('Add Transaction Repository', () => {
    test('Should call TransactionRepository with correct values', async () => {
        const { sut, transactionRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(transactionRepositoryStub, 'add')
        await sut.add(makeFakeTransaction())
        expect(addSpy).toHaveBeenCalledWith(makeFakeTransaction())
    })

    test('Should throw if TransactionRepository throws', async () => {
        const { sut, transactionRepositoryStub } = makeSut()
        jest.spyOn(transactionRepositoryStub, 'add').mockRejectedValueOnce(new Error())
        const response = sut.add(makeFakeTransaction())
        await expect(response).rejects.toThrow(new Error())
    })
});