const express = require('express');
const apiRoutes = require('./api-routes/api-router')

const server = express();

server.use(express.json());

server.use('/api', apiRoutes)

server.listen(8000, () => console.log('API Running...'));
