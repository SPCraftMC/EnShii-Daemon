const mysql = require('mysql')
const config = require('./util/config')

function Connection() {
    return mysql.createConnection(config.mysqldb)
}

function executeQuery(s) {
    const conn = new Connection()
    conn.connect()
    conn.query(s, (err, result) => {
        if(err) {
            return [false, null, err.message]
        }
        return [true, result, null]
    })
    conn.end()
}