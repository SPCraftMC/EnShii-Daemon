// 只包含json数据
const config = {
  daemon: {
    host: "127.0.0.1",
    port: 15450,
    name: "enshii", // pm2 instance name here, u can use this in pm2 commands
    instance: 1, // "max" or 0 to use max thread. you can also use numbers(1, 2, 4...)\
    // 注意，还没写token验证的适配，请使用1
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
    },
    redis: {
      host: "",
      port: 6379
    }
  },

  root: {
    name: "enshii",
    password: "enshii",
    email: "enshii@spcraft.ml"
  },

  panel: {
    url: "http://localhost:15455"
  },

  tokenDelay: 3, // hours
}

module.exports = {
  config
}
