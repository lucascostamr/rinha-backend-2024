const MountExtractModel = require("./mount-extract");

describe('Mount Extract Model', () => {
  test('Should return null if no client is provided', () => {
    const sut = new MountExtractModel()
    const response = sut.mount()
    expect(response).toBe(null)
  })

  test('Should return extract on success', () => {
    const sut = new MountExtractModel()
    const client = {
      limite: 'any_limite',
      saldo_inicial: 'any_saldo',
      ultimas_transacoes: []
    }
    const response = sut.mount(client)
    expect(response.saldo.total).toBe('any_saldo')
    expect(response.saldo.data_extrato).toBeTruthy()
    expect(response.saldo.limite).toBe('any_limite')
    expect(response.ultimas_transacoes).toEqual([])
  })
});