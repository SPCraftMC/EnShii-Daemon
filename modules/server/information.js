const { config } = require('../../config.js')

//待修改
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
