//const config = require('../util/config')
const dotenv = require("dotenv")

dotenv.config()

module.exports = (res) => {
    res.header("content-type", "application/json");
    res.header("Access-Control-Allow-Origin", process.env.PANEL_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");
};
