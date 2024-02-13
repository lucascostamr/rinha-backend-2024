const app = require('./config/app')
const env = require('./config/env')
const MongoHelper = require('../infra/database/mongo/helpers/mongo-helper')

MongoHelper.connect(env.uri).then(() => app.listen(env.port, env.host, () => console.log(`Listening on port ${env.port}`)))