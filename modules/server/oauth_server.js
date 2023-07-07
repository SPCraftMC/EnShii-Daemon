//const { serverConfig, fastloginConfig } = require('../../util/config')
const dotenv = require("dotenv")
const oauth = require('../../oauth.json')

dotenv.config()

const config = process.env

/*const yconfig = fastloginConfig
const sconfig = serverConfig*/

module.exports = (req, res) => {
    let resp = {}
    if (config.OAUTH) resp = {
        status: true,
        message: "",
        data: {
            fastlogin: config.OAUTH,
            services: getServices()
        }
    }
    else resp = {
        status: true,
        message: "",
        data: {
            fastlogin: config.OAUTH
        }
    }
    res.status(200)
    res.send(resp)
}

function getServices() {
    let services = []
    oauth.services.forEach(it => {
        let ts = {
            name: it.name,
            id: it.id,
            oauth: {
                api_uri: it.api_root,
                client_id: it.oauth_app.client_id,
                client_secret: it.oauth_app.client_secret
            }
        }
        services.push(ts)
    });
    return services
}
