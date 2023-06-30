const util = require('./conn');
const logger = require('../util/logger');
const {token} = require("./db");
async function createToken(id) {
    let guid = ''
    for (let i = 1; i <= 32; i++) {
        const n = Math.floor(Math.random() * 16.0).toString(16)
        guid += n
    }
    
    const sql = "INSERT INTO token (id, token) VALUES (?, ?)"
    const values = [id, guid]
    
    await util.executeQuery(sql, values)
    return guid
}

module.exports = {
    createToken: createToken
}