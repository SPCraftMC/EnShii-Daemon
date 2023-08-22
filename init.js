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
        exec('node index.js', (error) => {
          if (error) {
            logger.error(`${error}`);
            logger.error("Error while start server thread!");
            logger.error("EnShii-Daemon will exit now.");
            process.exit();
          }
          resolve()
        });
      });
    });
  });
}

init()