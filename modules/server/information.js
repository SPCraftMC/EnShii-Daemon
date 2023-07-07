//const { serverConfig } =require('../../util/config.js')
const dotenv = require("dotenv")

dotenv.config()

const config = process.env

module.exports = (req, res) => {
    let resp = {
        status: true,
        message: "",
        data: {
            server_name: config.DAEMON_NAME,
            panel_info: {
                name: config.PANEL_NAME,
                icon: config.PANEL_FAVICON,
                title: {
                    site: config.PANEL_SITE_TITLE,
                    menu: config.PANEL_MENU_TITLE
                }
            }
        }
    }
    res.status(200)
    res.send(resp)
}
