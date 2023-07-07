const dotenv = require("dotenv")

dotenv.config()

const config = process.env

module.exports = (req, res) => {
    const resp = {
        status: true,
        message: "",
        data: {
            enable: config.CAPTCHA,
            site_key: ""
        }
    }
    if (config.CAPTCHA) {
        if (config.CAPTCHA_PROVIDER === "turnsile")
            resp.data.site_key = config.TURNSILE_SITE_KEY
    }
    res.status(200)
    res.send(resp)
};
