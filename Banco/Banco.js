const config = require('../config.json');
const MongoClient = require('mongodb').MongoClient;

const salvarPacoteSFT9001 = (pacote) =>
    new Promise((_, rejeitar) => {
        MongoClient.connect(config.dbpath, { useNewUrlParser: true, useUnifiedTopology: true }, (erroCon, client) => {
            if (erroCon) rejeitar(erroCon);
            else {
                const coll = client.db('Banco').collection('stf9001');
                coll.insertOne(pacote, (erroInsercao) => {
                    if (erroInsercao) rejeitar(erroInsercao);
                });
            }
        });
    });

const lerUltimoPacoteSFT9001DoEquipamento = (id) =>
    new Promise((resolver, rejeitar) => {
        const filtro = {
            IdentificadorDispositivo: parseInt(id),
        };
        const ordenacao = {
            natural: -1,
        };
        const projecao = {
            _id: 0,
            TipoDeMensagem: 0,
            Dados: { Flags: 0, Relogio: 0 },
        };
        const limite = 1;

        MongoClient.connect(config.dbpath, { useNewUrlParser: true, useUnifiedTopology: true }, (erroCon, cliente) => {
            if (erroCon) rejeitar(erroCon);
            else {
                const coll = cliente.db('Banco').collection('stf9001');
                coll.findOne(
                    filtro,
                    {
                        projection: projecao,
                        sort: ordenacao,
                        limit: limite,
                    },
                    (erroBusca, resultado) => {
                        if (erroBusca) rejeitar(erroBusca);
                        else {
                            resolver(resultado);
                        }
                        cliente.close();
                    }
                );
            }
        });
    });

module.exports = {
    salvarPacoteSFT9001,
    lerUltimoPacoteSFT9001DoEquipamento,
};
