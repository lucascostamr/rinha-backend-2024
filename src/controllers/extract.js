const { MissingParamError } = require("../errors")
const { clientNotFoundError, serverError, ok, badRequest } = require("../helpers/http")

class ExtractController {
  getClientRepository
  mountExtractModel

  constructor(getClientRepository, mountExtractModel) {
    this.getClientRepository = getClientRepository
    this.mountExtractModel = mountExtractModel
  }
  async handle (httpRequest) {
    try{
      if(!httpRequest.body.client_id) return badRequest(new MissingParamError('client_id'))
      const client = await this.getClientRepository.get(httpRequest.body.client_id)
      const extract = await this.mountExtractModel.mount(client)
      return ok(extract)
    } catch(error) {
      if(error.name === 'ClientNotFoundError') return clientNotFoundError(error)
      return serverError(error)
    }
  }
}

module.exports = ExtractController