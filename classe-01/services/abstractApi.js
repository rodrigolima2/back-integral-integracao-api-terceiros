const axios = require('axios');

const instanciaAxios = axios.create({
    baseURL: 'https://companyenrichment.abstractapi.com/v1',
    params: {
        api_key: 'c206b3837b1048f2846066da4ab6b63b'
    }
});

module.exports = instanciaAxios;