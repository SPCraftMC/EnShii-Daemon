const logger = require ('../util/logger')
const { exec } = require('child_process');
const { PrismaClient } = require('./client')
const prisma = new PrismaClient()

//执行shell命令，根据'../prisma/schema.prisma'初始化数据库
module.exports = () => {
  return new Promise((resolve, reject) => {
    exec('npx prisma db push', (error, stdout, stderr) => {
      if (error) {
        logger.error(`${error}`);
        logger.error("[init]Error while initializing the databasemodel!");
        logger.error("EnShii-Daemon will exit now.");
        process.exit();
      }
      logger.info(`stdout: ${stdout}`);
      logger.info("Database model initialization successful.");
      exec('npx prisma db seed', (error, stdout, stderr) => {
        if (error) {
          logger.error(`${error}`);
          logger.error("[init]Error while prepare root user!");
          logger.error("EnShii-Daemon will exit now.");
          process.exit();
        }
        logger.info(`stdout: ${stdout}`);
        logger.info("The root user fit the requirements. Initialization successful.");
        resolve()
      });
    });
  });
}
