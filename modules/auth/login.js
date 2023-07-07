const db = require("../../database/db")
const sha256 = require("js-sha256")
const logger = require("../../util/logger")

module.exports = (req, res) => {
    const resp = {
        status: false,
        message: "International server error.",
        data: {
            token: null
        }
    }
    const params = req.body

    db.userdata.getId(params.name)
        .then((id) => {
            if (id != null) {
                return db.userdata.getUserDataAndCompareLoginData(id, params.password)
                    .then((status) => {
                        if (status) {
                            resp.status = true
                            resp.message = ""
                            resp.data.token = db.token.createToken(id)
                            res.status(200).send(resp)
                        } else {
                            resp.message = "Invalid password."
                            res.status(403).send(resp)
                        }
                    })
                    .catch((error) => {
                        resp.message = `Error while querying the database: ${error.message}`
                        res.status(500).send(resp)
                    })
            } else {
                resp.message = "User not found."
                res.status(403).send(resp)
            }
        })
        .catch((error) => {
            resp.message = `Error while querying the database: ${error.message}`
            res.status(500).send(resp)
        })
}
