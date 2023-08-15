//集线器文件
const init = require('./init')
const user = require("./user")
const token = require("../modules/token")
const blacklist = require("./blacklist")

module.exports = {
    init: init,
    user: user,
    token: token,
    blacklist: blacklist
}
/*
权限
-1 - banned
1 - user
2 - admin
3 - root
*/
