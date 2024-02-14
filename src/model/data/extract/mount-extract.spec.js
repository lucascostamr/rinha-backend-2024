describe('Mount Extract Model', () => {
  test('Should throw if no client is provided', async () => {
    const sut = new MountExtractModel()
    const response = sut.mount({})
    await expect(response).rejects.toThrow()
  })
});