const { config } = require('../../config.js')

module.exports = (req, res) => {
  let resp = {
    status: true,
    message: "",
    data: {
      server: {
        name: config.daemon.name,
        database: {
          provider: config.source.provider
        }
      },
      panel: {
        name: config.panel.name,
        //icon: config.panel.favicon,
        title: {
          site: config.panel.title.site,
          menu: config.panel.title.menu
        }
      }
    }
  }
  res.status(200)
  res.send(resp)
}
