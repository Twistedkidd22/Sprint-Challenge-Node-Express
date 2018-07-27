const express = require('express')
const projectRoutes = require('./routes/project-router')
const actionRoutes = require('./routes/action-router')

const api = express.Router();

api.use('/projects', projectRoutes)
api.use('/actions', actionRoutes)

module.exports = api;
