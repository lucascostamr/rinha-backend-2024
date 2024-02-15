const GetClientMongoRepository = require('../../infra/database/mongo/client/get-client-mongo-repository')
const ExtractController = require('../../controllers/extract')
const MountExtractModel = require('../../model/data/extract/mount-extract')

const makeExtractController = () => {
  const mountExtractModel = new MountExtractModel()
  const getClientMongoRepository = new GetClientMongoRepository()
  return new ExtractController(getClientMongoRepository, mountExtractModel)
}

module.exports = makeExtractController