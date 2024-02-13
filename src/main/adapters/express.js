const adaptRoute = (controller) => {
  return async (req, res) => {
    const body = Object.assign({}, req.body, { client_id: +req.params.id })
    const httpRequest = { body }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

module.exports = adaptRoute