const instanciaAxios = require('../services/abstractApi');
const { readFile, writeFile } = require('fs').promises;

const consultarEmpresa = async (req, res) => {
    const { dominioEmpresa } = req.params;

    async function inserirNoArquivo(nomeArquivo, conteudo) {
        const data = await readFile(nomeArquivo, 'utf-8');
        const json = JSON.parse(data || '[]');

        if (!Array.isArray(json)) {
            throw new Error(`Malformed JSON. Expected array, got: ${json}.`);
        }
        json.push(conteudo);

        const jsonString = JSON.stringify(json);

        await writeFile(nomeArquivo, jsonString);
    }

    try {
        const empresa = await instanciaAxios.get('', {
            params: {
                domain: dominioEmpresa
            }
        });

        if (!empresa.data.name) {
            res.json({ erro: 'Nome da empresa não existe.' });
            return;
        }

        inserirNoArquivo('./data/empresas.json', empresa.data)
            .catch(console.error);

        return res.json(empresa.data);
    } catch (error) {
        return res.json({
            erro: `${error}`
        });
    }
}

module.exports = {
    consultarEmpresa,
}