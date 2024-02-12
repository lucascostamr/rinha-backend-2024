const SaveTransactionModel = require('./save-transaction')

describe('Save Transaction', () => {
  test('Should return client last transactions on success', async () => {
    const sut = new SaveTransactionModel()
    const transaction = {
      valor: 'any_value',
      tipo: 'any_tipo',
      descricao: 'any_descricao',
      realizada_em: new Date('2024-02-12')
    }
    const response = await sut.save(transaction)
    expect(response).toEqual({
      ultimas_trasacoes: [
        {
          valor: 'any_value',
          tipo: 'any_tipo',
          descricao: 'any_descricao',
          realizada_em: new Date('2024-02-12')
        }
      ]
    })
  })
});