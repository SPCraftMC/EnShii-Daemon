const sconfig = require('../../util/config').serverConfig;

module.exports = (req, res) => {
    let resp = {
        status: true,
        message: "",
        data: {
            server_name: sconfig.name,
            panel_info: {
                name: sconfig.panel.name,
                icon: sconfig.panel.icon_uri
            }
        }
    }
    res.setHeader("content-type", "application/json")
    res.status(200)
    res.send(resp)
}