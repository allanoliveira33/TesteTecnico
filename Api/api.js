const express = require('express');
const app = express();
const config = require('../config.json');
const banco = require('../Banco/Banco');

const PORT = process.env.PORT || config.portaApi;

const inicializarApi = () => {
    app.get('/api/v1/location/:device_id', (req, res) => {
        banco
            .lerUltimoPacoteSFT9001DoEquipamento(req.params.device_id)
            .then((resultado) => {
                res.send(resultado);
            })
            .catch((erro) => console.log(erro));
    });

    app.listen(PORT, () => {
        console.log(`Api iniciadada na porta: ${config.portaApi}`);
    });
};

module.exports = { inicializarApi };
