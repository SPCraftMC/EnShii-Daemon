const config = require('../../util/config').serverConfig;
const logger = require('../../util/logger');

module.exports = (req, res) => {
    const resp = {
        status: true,
        message: "",
        data: {
            enable: config.captcha.enable,
            site_key: ""
        }
    }
    if (config.captcha.enable) {
        if (config.captcha.choose === "turnsile")
            resp.data.site_key = config.captcha.turnsile.site_key
    }
    res.status(200)
    res.send(resp)
};
