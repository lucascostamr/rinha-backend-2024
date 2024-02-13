const { clientNotFoundError } = require("../helpers/http")

class ExtractController {
  getClientRepository

  constructor(getClientRepository) {
    this.getClientRepository = getClientRepository
  }
  async handle (httpRequest) {
    try{
      if(!httpRequest.body.client_id) return { statusCode: 400 }
      await this.getClientRepository.get(httpRequest.body.client_id) 
    } catch(error) {
      return clientNotFoundError(error)
    }
  }
}

module.exports = ExtractController