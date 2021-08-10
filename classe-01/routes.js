const express = require('express');
const empresas = require('./controllers/empresas');

const routes = express();

routes.get('/empresas/:dominioEmpresa', empresas.consultarEmpresa);

module.exports = routes;