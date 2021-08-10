const express = require('express');
const votacao = require('./controllers/votacao');

const routes = express();

routes.get('/votacao', votacao.verificarVotos)
routes.post('/votacao/:pais/:ip', votacao.validarVoto);

module.exports = routes;