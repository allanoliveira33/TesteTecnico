const HEX = 16;

const splice = (string, start, delCount, newSubStr) => {
    return string.slice(0, start) + newSubStr + string.slice(start + Math.abs(delCount));
};
const traduzirPacote = (pacote) =>
    new Promise((resolver, rejeitar) => {
        let pacoteSFT9001 = (PacoteSFT9001 = {
            IdentificadorDispositivo: '',
            TipoDeMensagem: '',
            Dados: [],
        });
        pacoteSFT9001.IdentificadorDispositivo = parseInt(pacote.substring(4, 10), HEX);
        pacoteSFT9001.TipoDeMensagem = parseInt(pacote.substring(10, 12), HEX);

        switch (pacoteSFT9001.TipoDeMensagem) {
            case 1:
                pacoteSFT9001.Dados = pacote.substring(12, 20);
                break;
            case 2:
                let dadosLocalizacao = (Localizacao = {
                    Data: '',
                    Direcao: '',
                    Distancia: '',
                    Relogio: '',
                    Flags: '',
                    Velocidade: '',
                    Latitude: '',
                    Longitude: '',
                });
                dadosLocalizacao.Data = formatarData(parseInt(pacote.substring(12, 20), HEX));
                dadosLocalizacao.Direcao = formatarDirecao(parseInt(pacote.substring(20, 24), HEX).toString());
                dadosLocalizacao.Distancia = parseInt(pacote.substring(24, 32), HEX);
                dadosLocalizacao.Relogio = parseInt(pacote.substring(32, 40), HEX);
                dadosLocalizacao.Flags = parseInt(pacote.substring(40, 44), HEX).toString(2);
                dadosLocalizacao.Velocidade = parseInt(pacote.substring(44, 46), HEX);
                dadosLocalizacao.Latitude = formatarCoordenada(
                    parseInt(pacote.substring(46, 54), HEX).toString(),
                    dadosLocalizacao.Flags.slice(3, 4)
                );
                dadosLocalizacao.Longitude = formatarCoordenada(
                    parseInt(pacote.substring(54, 62), HEX).toString(),
                    dadosLocalizacao.Flags.slice(4, 5)
                );

                pacoteSFT9001.Dados = dadosLocalizacao;
                break;
        }
        resolver(pacoteSFT9001);
    });

const formatarData = (segundos) => {
    return new Date(segundos * 1000).toLocaleString();
};

const formatarDirecao = (numero) => {
    return parseFloat(splice(numero, -2, 0, '.'));
};

const formatarCoordenada = (coordenada, bit) => {
    coordenada = splice(coordenada, -6, 0, '.');
    if (bit === '1') {
        return '-'.concat(coordenada);
    }
    return coordenada;
};

const validarCabecalho = (data) => {
    if (data === '50F7') {
        return true;
    }
    return false;
};
const validarRodape = (data) => {
    if (data === '73C4') {
        return true;
    }
    return false;
};

const criarPacotePingAck = (idDispositivo) => {
    return `50F7${idDispositivo.toString(16).padStart(8, '0').toUpperCase()}0150494E4773C4`;
};

module.exports = {
    traduzirPacote,
    validarCabecalho,
    validarRodape,
    formatarCoordenada,
    formatarData,
    formatarDirecao,
    criarPacotePingAck,
};
