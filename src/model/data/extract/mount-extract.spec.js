const MountExtractModel = require("./mount-extract");

describe('Mount Extract Model', () => {
  test('Should return null if no client is provided', () => {
    const sut = new MountExtractModel()
    const response = sut.mount()
    expect(response).toBe(null)
  })
});