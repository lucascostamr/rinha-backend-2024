const express = require('express')
const setUpMiddlewares = require('./middleware')

const app = express()

setUpMiddlewares(app)

module.exports = app