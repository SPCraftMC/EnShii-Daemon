const db = require("../../database/db")
const sha256 = require("js-sha256")
const logger = require("../../util/logger")

module.exports = (req, res) => {
    const resp = {
        status: false,
        message: null,
        data: {
            token: null
        }
    }
    const params = req.body
    const basedPassword = sha256(params.password)

    db.userdata.getId(params.name).then((id) => {
        if (id != null) {
            db.userdata.getUserDataAndCompareLoginData(params.name, basedPassword)
                .then((status) => {
                    if (status) {
                        resp.status = true
                        resp.message = ""
                        resp.data.token = db.token.createToken()
                        res.status(200)
                    }
                }).catch((error) => {
                resp.message = `Error while query database: ${error.message}.`
                res.status(500)
            })
        } else {
            resp.message = "User not found."
            res.status(403)
        }
    })
    res.send(resp)
}