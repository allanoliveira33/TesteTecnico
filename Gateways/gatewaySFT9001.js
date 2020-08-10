const net = require('net');
const TradutorSFT9001 = require('../Tradutores/TradutorSFT9001');
const db = require('../Banco/Banco');
const config = require('../config.json');

const PORT = config.portaGateway;
const HOST = config.ipGateway;

const inicializarGateway = () => {
    net.createServer((socket) => {
        console.log('CONECTADO: ' + socket.remoteAddress + ':' + socket.remotePort);
        socket.on('data', (dados) => {
            console.log('PACOTE RECEBIDO -> ' + socket.remoteAddress + ': ' + dados);
            const Encoding = 'utf8';
            tratarDados(dados.toString(Encoding), socket);
        });
        socket.on('close', () => {
            console.log('CONEXAO FECHADA: ' + socket.remoteAddress + ' ' + socket.remotePort);
        });
    }).listen(PORT, HOST);

    console.log('Server escutando em ' + HOST + ':' + PORT);
};

const tratarDados = (dados, socket) =>
    new Promise((_, rejeitar) => {
        TradutorSFT9001.traduzirPacote(dados)
            .then((pacote) => {
                tratarMensagemPorTipo(pacote, socket);
            })
            .catch((erro) => {
                rejeitar(erro);
            });
    });

const tratarMensagemPorTipo = (pacote, socket) => {
    if (pacote.TipoDeMensagem === 1) {
        let pingAck = TradutorSFT9001.criarPacotePingAck(pacote.IdentificadorDispositivo);
        console.log(`PACOTE ENVIADO: ${pingAck}`);
        socket.write(pingAck);
    } else {
        db.salvarPacoteSFT9001(pacote).catch((erro) => {
            rejeitar(erro);
        });
    }
};

module.exports = { inicializarGateway };
