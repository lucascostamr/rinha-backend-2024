const { clientNotFoundError, serverError } = require("../helpers/http")

class ExtractController {
  getClientRepository
  mountExtractModel

  constructor(getClientRepository, mountExtractModel) {
    this.getClientRepository = getClientRepository
    this.mountExtractModel = mountExtractModel
  }
  async handle (httpRequest) {
    try{
      if(!httpRequest.body.client_id) return { statusCode: 400 }
      const client = await this.getClientRepository.get(httpRequest.body.client_id)
      await this.mountExtractModel.mount(client)
    } catch(error) {
      if(error.name === 'ClientNotFoundError') return clientNotFoundError(error)
      return serverError(error)
    }
  }
}

module.exports = ExtractController