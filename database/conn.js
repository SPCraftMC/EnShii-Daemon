const mysql = require('mysql');
const logger = require('../util/logger');
const config = require('../util/config');

const pool = mysql.createPool(config.serverConfig.mysqldb);

function executeQuery(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        logger.error("Error while getting database connection: " + err.message);
        reject(err);
        return;
      }

      connection.query(sql, values, (err, result) => {
        connection.release();

        if (err) {
          logger.error("Error while executing the database query: " + err.message);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
}

module.exports = {
    executeQuery: executeQuery
};
