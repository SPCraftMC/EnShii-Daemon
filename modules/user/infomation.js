const db = require('../../database/db')
const {verify} = require("../token");
const {user} = require("../../database/db");

module.exports = (req, res) => {
    const resp = {
        status: false,
        message: "International server error.",
        data: {}
    }

    const params = req.body

    verify(params.token).then((status) => {
        if (status) {
            user.all(params.token).then((resultData) => {
                resp.status = true
                resp.message = ""
                resp.data = {
                    name: resultData.name,
                    id: resultData.id,
                    email: resultData.email,
                    linked_oauth: resultData.linkedOauth
                }
                res.status(200)
            })
            .catch(() => {
                res.status(500)
            })
            .finally(() => {
                res.send(resp)
            })
        } else {
            resp.message = "Token invaild."
            res.status(403).send(resp)
        }
    })
}
