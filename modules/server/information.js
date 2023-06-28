const sconfig = require('../../util/config').serverConfig;

module.exports = (req, res) => {
    let resp = {
        status: true,
        message: "",
        data: {
            server_name: sconfig.name,
            panel_info: {
                name: sconfig.panel.name,
                icon: sconfig.panel.icon_uri,
                title: {
                    site: sconfig.panel.title.site,
                    menu: sconfig.panel.title.menu
                }
            }
        }
    }
    res.setHeader("content-type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", sconfig.panel.uri)
    res.status(200)
    res.send(resp)
}