const SaveTransactionModel = require('./save-transaction')

const makeAddTransactionStub = () => {
  class AddTransactionRepositoryStub {
    async add () {
      return new Promise(resolve => resolve(makeFakeLastTransactions()))
    }
  }
  return new AddTransactionRepositoryStub() 
}

const makeFakeTransaction = () => ({
  valor: 'any_value',
  tipo: 'any_tipo',
  descricao: 'any_descricao',
  realizada_em: new Date('2024-02-12')
})

const makeFakeLastTransactions = () => ({
  ultimas_trasacoes: [
    {
      valor: 'any_value',
      tipo: 'any_tipo',
      descricao: 'any_descricao',
      realizada_em: new Date('2024-02-12')
    }
  ]
})

const makeSut = () => {
  const addTransactionRepositoryStub = makeAddTransactionStub()
  const sut = new SaveTransactionModel(addTransactionRepositoryStub)
  return {
    sut,
    addTransactionRepositoryStub
  }
}

describe('Save Transaction', () => {
  test('Should call AddTransactionStub with correct values', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')
    await sut.save(makeFakeTransaction())
    expect(addSpy).toHaveBeenCalledWith(makeFakeTransaction())
  })

  test('Should throw if AddTransactionStub throw', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    jest.spyOn(addTransactionRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const response = sut.save(makeFakeTransaction())
    await expect(response).rejects.toThrow(new Error())
  })
  
  test('Should return client last transactions on success', async () => {
    const { sut } = makeSut()
    const response = await sut.save(makeFakeTransaction())
    expect(response).toEqual(makeFakeLastTransactions())
  })
});