//前部json内容；后部部分值写入环境变量供prisma生成客户端
const config = {
  host: "127.0.0.1",
  port: 15450,
  database {
    method: "mysql",
    mysql: {
      host: "127.0.0.1",
      port: 3306,
      username: "enshii",
      password: "enshii",
      database: "enshii"
    },
  token-delay: "3" // hours
  }
}