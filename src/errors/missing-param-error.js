class MissingParamError extends Error {
  constructor(param) {
      super(`Missing param: ${param}`)
      this.name = 'MissingParamError'
  }
}

module.exports = MissingParamError