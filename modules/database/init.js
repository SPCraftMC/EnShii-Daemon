const logger = require ('../util/logger')
const { exec } = require('child_process');

/*执行shell命令，根据'../prisma/schema.prisma'初始化数据库结构并执行'./seed.js'配置root用户*/
module.exports = () => {
  return new Promise((resolve, reject) => {
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
        resolve()
      });
    });
  });
}
