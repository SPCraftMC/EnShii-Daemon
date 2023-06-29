const util = require('./conn');
const logger = require('../util/logger');

async function addUserData(userData) {
    const sql = `INSERT INTO user_data (name, id, email, linked_oauth) VALUES (?, ?, ?, ?)`;
    const values = [userData.name, userData.id, userData.email, userData.linked_oauth];

    try {
        const result = await util.executeQuery(sql, values);
        logger.info('User data has been successfully added to the user_data table.');
    } catch (error) {
        logger.error('Failed to add user data: ' + error.message);
    }
}