const axios = require('axios');

const instanciaAxios = axios.create({
    baseURL: 'https://ipgeolocation.abstractapi.com/v1/',
    params: {
        api_key: '550e79f2c2984aee9a12fbffaf321436'
    }
});

module.exports = instanciaAxios;