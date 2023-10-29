// 只包含json数据
const config = {
  daemon: {
    host: "127.0.0.1",
    port: 15450,
    name: "enshii", // pm2 instance name here, use this in pm2 commands
    timeout: 3000 // the force kill timeout(ms)
  },

  panel: {
    url: "http://localhost:15455",
    name: "「青镜」玩家管理面板",
    title: {
      site: "「青镜」玩家管理面板",
      menu: "menu"
    }
  },

  oauth: [
    {
      name: "RedStone Skin - 红石皮肤站",
      id: 0,
      apiUrl: "https://mcskin.cn",
      oauthApp: {
        clientId: 0,
        clientSecret: "EXAMPLESECRET"
      }
    },
    {
      name: "StarSkin - 星空皮肤站",
      id: 1,
      apiUrl: "https://star-skin.cn",
      oauthApp: {
        clientId: 0,
        clientSecret: "EXAMPLESECRET"
      }
    }
  ],

  source: {
    provider: 'sqlite',
    sql: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "enshii",
      database: "enshii"
    },
    sqlite: "./dev.db"
  },
  users: {
    root: {
      name: "enshii",
      password: "enshii",
      email: "enshii@spcraft.ml"
    }
  },

  tokenDelay: 3, // hours
}

module.exports = {
  config
}
