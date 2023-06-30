const db = require("../../database/db")
const sha256 = require("js-sha256")

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

    const id = db.userdata.getId(params.name)
    if (id !== null) {
        db.userdata.getUserDataAndCompareLoginData(params.name, basedPassword)
        .then((status) => {
            if (status) {
                resp.status = true
                resp.message = ""
                resp.data.token = db.token.createToken()
                res.status(200)
                res.send(resp)
            }
        }).catch((error) => {
            resp.message = `Error while query database: ${error.message}.`
            res.status(500)
            res.send(resp)
        })
    } else {
        resp.message = "User not found."
        res.status(403)
        res.send(resp)
    }
}