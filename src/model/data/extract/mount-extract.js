class MountExtractModel {
  mount (client) {
    if(!client) return null
    for(const field of ['saldo_inicial', 'limite', 'ultimas_transacoes']) {
      if(!client[field]) return null
    }
    const { saldo_inicial, limite, ultimas_transacoes } = client
    const extract = {
      saldo: {
        total: saldo_inicial,
        data_extrato: new Date(),
        limite: limite
      },
      ultimas_transacoes
    }
    return extract
  }
}

module.exports = MountExtractModel