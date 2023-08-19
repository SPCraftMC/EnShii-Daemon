// 只包含json数据
const config = {
  host: "127.0.0.1",
  port: 15450,
  source: {
    // method: {...}
    provider: "mysql",
    host: "127.0.0.1",
    port: 3306,
    user: "enshii",
    password: "enshii",
    database: "enshii"
  },
  tokenDelay: 3 // hours
}

module.exports = {
  config
}
