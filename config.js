// 只包含json数据
const config = {
  host: "127.0.0.1",
  port: 15450,
  run: {
    name: "enshii", // pm2 instance name here, u can use this in pm2 commands
    thread: 8, // "max" or 0 to use max thread. you can also use numbers(1, 2, 4...)
    timeout: 3000 // the force kill timeout(ms)
  },
  source: {
    // method: {...}
    provider: "mysql",
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "enshii",
    database: "enshii"
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
