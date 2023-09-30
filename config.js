// 只包含json数据
const config = {
  daemon: {
    host: "127.0.0.1",
    port: 15450,
    name: "enshii", // pm2 instance name here, use this in pm2 commands
    timeout: 3000 // the force kill timeout(ms)
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
    provider: 'mysql',
    sql: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "enshii",
      database: "enshii"
    }
  },
  users: {
    root: {
      name: "enshii",
      password: "enshii",
      email: "enshii@spcraft.ml"
    }
  },

  panel: {
    url: "http://localhost:15455"
  },

  tokenDelay: 3, // hours
}

module.exports = {
  config
}
