// 把dbinit以及其他启动与预启动操作集成，最后通过shell启动index以防止依赖爆炸
const logger = require('./util/logger')
const { exec } = require('child_process')
const { config } = require('./config.js')


const init = async () => {
  return new Promise((resolve, reject) => {
    logger.info('Set the environment variables')
    // write all db envi
    let databaseUrl = config.source.provider + '://' + config.source.user + ':' + config.source.password + '@' + config.source.host + ':' + config.source.port + '/' + config.source.database
    process.env.DATABASE_URL = databaseUrl.toString()

    // 执行shell命令，根据'../prisma/schema.prisma'初始化数据库结构并执行'./seed.js'配置root用户
    logger.info('Initializing the database')
    exec('npx prisma db push', (error) => {
      if (error) {
        logger.error(`${error}`);
        logger.error("Error while initializing the database model!");
        logger.error("EnShii-Daemon will exit now.");
        process.exit();
      }
      logger.info("Database model initialization successful.");
      exec('npx prisma db seed', (error) => {
        if (error) {
          logger.error(`${error}`);
          logger.error("Error while preparing root user!");
          logger.error("EnShii-Daemon will exit now.");
          process.exit();
        }
        logger.info("Root user fit the requirements.");
        const command = "pm2 start ./index.js --watch --deep-monitoring --merge-logs -i " + config.run.thread + " --kill-timeout " + config.run.timeout + " --name " + config.run.name
        exec(command, (error) => {
          if (error) {
            logger.error(`${error}`);
            logger.error("Error while start server thread!");
            logger.error("EnShii-Daemon will exit now.");
            process.exit();
          }
          logger.info(`Initialization successful.(${Math.round(performance.now())}ms)`);
          console.log(``);
          console.log(`\x1B[2m╭──────────────────────────────────────────────────────╮\x1B[0m`);
          console.log(`\x1B[2m│\x1B[0m ▓▓▓▓▓▓▓▓▓▓▓            ▓▓▓▓▓▓▓▓▓▓▓  ▓▓        〓  〓 \x1B[2m│\x1B[0m`);
          console.log(`\x1B[2m│\x1B[0m ▓▓                     ▓▓           ▓▓        ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
          console.log(`\x1B[2m│\x1B[0m ▓▓▓▓▓▓▓▓▓▓▓  ▓▓✚▓▓▓✚   ▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓✚   ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
          console.log(`\x1B[2m│\x1B[0m ▓▓           ▓▓    ▓▓           ▓▓  ▓▓    ▓▓  ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
          console.log(`\x1B[2m│\x1B[0m ▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
          console.log(`\x1B[2m│──────────────────────────────────────────────────────│\x1B[0m`);
          console.log(`\x1B[2m│\x1B[0m EnShii-Daemon  \x1B[2m|\x1B[0m  Powered by SPCraftMC & crux_tech.  \x1B[2m│\x1B[0m`);
          console.log(`\x1B[2m│\x1B[0m                     Made with \x1B[31m❤\x1B[0m .                    \x1B[2m│\x1B[0m`)
          console.log(`\x1B[2m╰──────────────────────────────────────────────────────╯\x1B[0m`)
          console.log(``);
          logger.info("Server thread started. These are some commands\n")
          console.log("'pm2 ls'    list all pm2 instance")
          console.log(`'pm2 logs ${config.run.name}'    watch logs`)
          console.log("'pm2 flush'    flush logs")
          console.log(`'pm2 reload ${config.run.name}'    reload the server`)
          console.log(`'pm2 stop ${config.run.name}'    stop the server`)
          console.log(`'pm2 kill'    kill all\n`)
          console.log("other commands see https://pm2.keymetrics.io/docs")
          resolve()
        });
      });
    });
  });
}

init()
