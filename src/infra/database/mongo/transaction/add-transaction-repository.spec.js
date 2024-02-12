const AddTransactionRepository = require('./add-transaction-repository')

describe('Add Transaction Repository', () => {
  test('Should return last transactions on success', async () => {
    const sut = new AddTransactionRepository()
    const response = await sut.add({
      valor: 'any_value',
      tipo: 'any_tipo',
      descricao: 'any_descricao',
      realizada_em: new Date()
    })
    expect(response.valor).toBe('any_value')
    expect(response.tipo).toBe('any_tipo')
    expect(response.descricao).toBe('any_descricao')
    expect(response.realizada_em).toBeTruthy()
  })
});