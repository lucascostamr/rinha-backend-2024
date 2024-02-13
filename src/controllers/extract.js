class ExtractController {
  getClientRepository

  constructor(getClientRepository) {
    this.getClientRepository = getClientRepository
  }
  async handle (httpRequest) {
    if(!httpRequest.body.client_id) return { statusCode: 400 }
    await this.getClientRepository.get(httpRequest.body.client_id)
  }
}

module.exports = ExtractController