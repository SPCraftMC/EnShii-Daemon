const init = require('./init')
const user = require("./user")
const token = require("../modules/token")

module.exports = {
    init: init,
    user: user,
    token: token
}
/*
权限
-1 - banned
1 - user
2 - admin
3 - root
*/
