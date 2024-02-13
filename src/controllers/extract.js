class ExtractController {
  async handle (httpRequest) {
    if(!httpRequest.body.client_id) return { statusCode: 400 }
  }
}

module.exports = ExtractController