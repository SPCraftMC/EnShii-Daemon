const mysql = require('mysql')
const logger = require('../util/logger')
const config = require('../util/config')

function getConnection() {
    logger.info("Create a new database connection.")
    return mysql.createPool(config.serverConfig.mysqldb)
}

function executeQuery(s) {
    const conn = getConnection()
    logger.info('Execute query.')
    conn.query(s, (err, result) => {
        if(err) {
            logger.error("Error while query database: " + err.message)
            return [false, null, err.message]
        }
        return [true, result, null]
    })
    return [false, null, "Unkown error."]
}

module.exports = {
    executeQuery: executeQuery
}
