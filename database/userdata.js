const util = require('./conn');
const logger = require('../util/logger');
const sha256 = require('js-sha256');

async function addUserData(userData) {
    const sql = `INSERT INTO user_data (name, id, email, linked_oauth) VALUES (?, ?, ?, ?)`;
    const values = [userData.name, userData.id, userData.email, userData.linked_oauth];

    try {
        const result = await util.executeQuery(sql, values);
        logger.info('User data has been successfully added to the user_data table.');
        return true
    } catch (error) {
        logger.error('Failed to add user data: ' + error.message);
        return false
    }
}

async function getUserDataAndCompareLoginData(id, password) {
        const sql = `SELECT * FROM user_data WHERE id = ?`;
        const values = [id];

        try {
            const result = await util.executeQuery(sql, values);
            if (result.length > 0) {
                //logger.info(result[0].password)
                //logger.info(`${sha256(result[0].password)} / ${password}`)
                //logger.info(sha256(result[0].password) === password)
                return sha256(result[0].password) === password
            } else return false; // 如果查询结果不为空，则返回 true，否则返回 false
        } catch (error) {
            throw new Error("Error while comparing credentials: " + error.message);
        }
}

async function getId(name) {
    const sql = 'SELECT id FROM user_data WHERE name = ?'
    const values = [name]
    
    try {
        const result = await util.executeQuery(sql, values);
        if (result.length > 0) {
            return result[0].id; // 返回查询结果的第一个用户的ID
        } else {
            return null; // 如果没有找到匹配的用户，则返回 null
        }
    } catch (error) {
        return null;
    }
}

module.exports = {
    addUserData: addUserData,
    getUserDataAndCompareLoginData: getUserDataAndCompareLoginData,
    getId: getId
}