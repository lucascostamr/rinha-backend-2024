class ClientNotFoundError extends Error {
  constructor(message) {
      super(`Client not found id: ${message}`)
      this.name = 'ClientNotFoundError'
  }
}

module.exports = ClientNotFoundError