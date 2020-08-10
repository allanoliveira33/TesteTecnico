const api = require('./Api/api');
const gatewaySFT9001 = require('./Gateways/gatewaySFT9001');

api.inicializarApi();
gatewaySFT9001.inicializarGateway();
