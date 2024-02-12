class AddTransactionRepository {
  async add () {
    return await new Promise(resolve => resolve({
      valor: 'any_value',
      tipo: 'any_tipo',
      descricao: 'any_descricao',
      realizada_em: new Date()
    }))
  }
}
module.exports = AddTransactionRepository