const MountExtractModel = require("./mount-extract");

describe('Mount Extract Model', () => {
  test('Should return null if no client is provided', () => {
    const sut = new MountExtractModel()
    const response = sut.mount()
    expect(response).toBe(null)
  })

  test('Should return null if no saldo_inicial is provided', () => {
    const sut = new MountExtractModel()
    const client = {
      saldo_inicial: 'any_saldo',
      limite: 'any_limite',
      ultimas_transacoes: []
    }
    const response = sut.mount()
    expect(response).toBe(null)
  })
});