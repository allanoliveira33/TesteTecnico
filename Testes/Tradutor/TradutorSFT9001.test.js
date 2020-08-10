const assert = require('assert');
const tradutorSFT9001 = require('../../Tradutores/TradutorSFT9001');
const { throws } = require('assert');
const e = require('express');

describe('Teste pacote Ping ACK ', () => {
    it('Deve retornar: 50F700087A230150494E4773C4 ', () => {
        assert.equal(tradutorSFT9001.criarPacotePingAck(555555), '50F700087A230150494E4773C4');
    });
});

describe('Teste formatacao de coordenada ', () => {
    it('Deve retornar -10.000000 ', () => {
        assert.equal(tradutorSFT9001.formatarCoordenada('10000000', '1'), '-10.000000');
    });

    it('Deve retornar 10.000000 ', () => {
        assert.equal(tradutorSFT9001.formatarCoordenada('10000000', '0'), '10.000000');
    });
});

describe('Teste formatacao de direcao ', () => {
    it('Deve retornar 300.00 ', () => {
        assert.equal(tradutorSFT9001.formatarDirecao('30000'), '300.00');
    });

    it('Deve retornar 0.00 ', () => {
        assert.equal(tradutorSFT9001.formatarDirecao('000'), '0.00');
    });
});

describe('Teste validacao de cabecalho ', () => {
    it('Deve retornar true ', () => {
        assert.equal(tradutorSFT9001.validarCabecalho('50F7'), true);
    });

    it('Deve retornar false ', () => {
        assert.equal(tradutorSFT9001.validarCabecalho('73C4'), false);
    });
});

describe('Teste validacao de rodapé ', () => {
    it('Deve retornar true ', () => {
        assert.equal(tradutorSFT9001.validarRodape('73C4'), true);
    });

    it('Deve retornar false ', () => {
        assert.equal(tradutorSFT9001.validarRodape('50F7'), false);
    });
});

describe('Teste formatacao de data ', () => {
    it('Deve retornar 2020-7-1 18:00:00 ', () => {
        assert.equal(tradutorSFT9001.formatarData('1593637200'), new Date('Wed, 01 Jul 2020 18:00:00 GMT-3:00').toLocaleString());
    });
});

describe('Teste parse pacote SFT9001 - Localizacao ', async () => {
    const pacoteTeste = new Buffer('50F70A3F73025EFCF950156F017D784000008CA0F8003C013026A1029E72BD73C4');
    let pacoteTraduzido;
    it('Sem excecoes ', (done) => {
        assert.doesNotReject(
            tradutorSFT9001
                .traduzirPacote(pacoteTeste)
                .then((resultado) => {
                    pacoteTraduzido = resultado;
                    done();
                })
                .catch((erro) => {
                    done(erro);
                })
        );
    });

    it('Mensagem tipo 2 ', () => {
        assert.equal(pacoteTraduzido.TipoDeMensagem, '2');
    });

    it('Localizacao preenchida - Data ', () => {
        assert.notEqual(pacoteTraduzido.Dados.Data, '', 'Sem Data');
        assert.notEqual(pacoteTraduzido.Dados.Direcao, '', 'Sem Direcao');
        assert.notEqual(pacoteTraduzido.Dados.Distancia, '', 'Sem Distancia');
        assert.notEqual(pacoteTraduzido.Dados.Relogio, '', 'Sem Relogio');
        assert.notEqual(pacoteTraduzido.Dados.Flags, '', 'Sem Flags');
        assert.notEqual(pacoteTraduzido.Dados.Velocidade, '', 'Sem Velocidade');
        assert.notEqual(pacoteTraduzido.Dados.Latitude, '', 'Sem Latitude');
        assert.notEqual(pacoteTraduzido.Dados.Longitude, '', 'Sem Longitude');
    });

    it('Localizacao preenchida - Direcao ', () => {
        assert.notEqual(pacoteTraduzido.Dados.Direcao, '', 'Sem Direcao');
    });

    it('Localizacao preenchida - Distancia ', () => {
        assert.notEqual(pacoteTraduzido.Dados.Distancia, '', 'Sem Distancia');
    });

    it('Localizacao preenchida - Flags ', () => {
        assert.notEqual(pacoteTraduzido.Dados.Flags, '', 'Sem Flags');
    });

    it('Localizacao preenchida - Velocidade ', () => {
        assert.notEqual(pacoteTraduzido.Dados.Velocidade, '', 'Sem Velocidade');
    });

    it('Localizacao preenchida - Latitude ', () => {
        assert.notEqual(pacoteTraduzido.Dados.Latitude, '', 'Sem Latitude');
    });

    it('Localizacao preenchida - Longitude ', () => {
        assert.notEqual(pacoteTraduzido.Dados.Longitude, '', 'Sem Longitude');
    });
});

describe('Teste parse pacote SFT9001 - Ping ', async () => {
    const pacoteTeste = new Buffer('50F70A3F730150494E4773C4');
    let pacoteTraduzido;
    it('Sem excecoes ', (done) => {
        assert.doesNotReject(
            tradutorSFT9001
                .traduzirPacote(pacoteTeste)
                .then((resultado) => {
                    pacoteTraduzido = resultado;
                    done();
                })
                .catch((erro) => {
                    done(erro);
                })
        );
    });

    it('Mensagem tipo 1 ', () => {
        assert.equal(pacoteTraduzido.TipoDeMensagem, '1');
    });

    it('Localizacao preenchida - Dados ', () => {
        assert.notEqual(pacoteTraduzido.Dados.Dados, '', 'Sem dados do ping');
    });
});
