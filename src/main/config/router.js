const { Router } = require('express')
const fg = require('fast-glob')

module.exports = (app) => {
  const router = Router()
  app.use('/api', router)
  fg.sync('**/src/main/routes/*route.js').forEach(async file => (await require(`../../../${file}`))(router))
}