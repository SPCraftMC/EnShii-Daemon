const util = require('./conn')
const logger = require('../util/logger')

module.exports = () => {
    // 用户数据
    let sql = "CREATE TABLE IF NOT EXISTS user_data("
            + "name             STRING   NOT NULL, "
            + "id               INT      UNIQUE, "
            + "email            STRING   NOT NULL, "
            + "linked_oauth     INT      DEFAULT   1 "
            + ")"
    const callback = util.executeQuery(sql)
    if (!callback[0]) {
        logger.error("Can't init database.")
        logger.error(callback[2])
        logger.error("EnShii-Daemon will exit now.")
        process.exit()
    } 
}