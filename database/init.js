const util = require('./conn');
const logger = require('../util/logger');

module.exports = () => {
    // User data
    const sql =
    "CREATE TABLE IF NOT EXISTS user_data(" +
    "name             VARCHAR(255)   NOT NULL, " +
    "id               INT      UNIQUE, " +
    "email            VARCHAR(255)   NOT NULL, " +
    "linked_oauth     INT      DEFAULT   1 " +
    ")";

    return new Promise((resolve, reject) => {
        util.executeQuery(sql)
      .then(result => {
          if (!result) {
              logger.error("Failed to initialize the database.");
              logger.error("EnShii-Daemon will exit now.");
              process.exit();
          } else {
              logger.info("Database initialization successful.");
              resolve(); // 表示初始化完成
          }
      })
      .catch(error => {
          logger.error("Error while initializing the database: " + error.message);
          logger.error("EnShii-Daemon will exit now.");
          process.exit();
      });
    });
};
