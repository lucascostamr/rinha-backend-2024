const express = require('express')
const setUpMiddlewares = require('./middleware')
const setUpRoutes = require('./router')

const app = express()

setUpMiddlewares(app)
setUpRoutes(app)

module.exports = app