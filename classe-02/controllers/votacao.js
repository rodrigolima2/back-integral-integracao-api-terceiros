const instanciaAxios = require('../services/abstractApi');
const { readFile, writeFile } = require('fs').promises;

const verificarVotos = async (req, res) => {
    try {
        const data = await readFile('./data/votos.json', 'utf-8');
        const json = JSON.parse(data || '[]');

        return res.json({
            Resultado: 'Todos os votos',
            votos: json
        });

    } catch (error) {
        return res.status(400).json({
            erro: `${error}`
        })
    }
}

const validarVoto = async (req, res) => {
    if (req.body.voto === undefined) {
        res.status(400).json({ erro: 'Voto não informado.' });
        return;
    }

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
        const ip = await instanciaAxios.get('', {
            params: {
                ip_address: req.params.ip
            }
        })

        if (!ip.data.country) {
            res.status(400).json({ erro: 'O IP não é válido.' })
            return;
        }

        if (req.params.pais !== ip.data.country) {
            res.status(400).json({ erro: 'O IP enviado não coincide com o país da votação.' })
            return;
        }

        const conteudo = {
            "ip": req.params.ip,
            "voto": req.body.voto
        };

        inserirNoArquivo('./data/votos.json', conteudo);

        return res.json({
            resultado: 'Voto realizado com sucesso',
            voto: conteudo
        });
    } catch (error) {
        return res.status(400).json({
            erro: `${error}`
        });
    }
}

module.exports = { validarVoto, verificarVotos, }