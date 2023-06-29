const config = require('../util/config');

module.exports = (res) => {
    res.header("content-type", "application/json");
    res.header("Access-Control-Allow-Origin", config.serverConfig.panel.uri);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");
};
