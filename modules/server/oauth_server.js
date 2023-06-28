const sconfig = require('../../util/config').serverConfig;
const yconfig = require('../../util/config').fastloginConfig;

module.exports = (req, res) => {
    let resp = {}
    if (yconfig.enable_fast_login) resp = {
        status: true,
        message: "",
        data: {
            fastlogin: yconfig.enable_fast_login,
            services: getServices()
        }
    }
    else resp = {
        status: true,
        message: "",
        data: {
            fastlogin: yconfig.enable_fast_login
        }
    }
    res.setHeader("content-type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", sconfig.panel.uri)
    res.status(200)
    res.send(resp)
}

function getServices() {
    let services = []
    yconfig.services.forEach(it => {
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