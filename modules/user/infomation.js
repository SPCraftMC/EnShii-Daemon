const { verify } = require("../../token");
const { user } = require("../database/db");

module.exports = (req, res) => {
    const resp = {
        status: false,
        message: "International server error.",
        data: {}
    };

    const params = req.body

    verify(params.token)
        .then((status) => {
            if (status) {
                user.all(params.token)
                    .then((result) => {
                        resp.status = true
                        resp.message = ""
                        resp.data = {
                            id: result.id,
                            rule: result.rule,
                            name: result.name,
                            email: result.email,
                            linked_oauth: result.linkedOauth
                        }
                        res.status(200).send(resp)
                    })
                    .catch(() => {
                        res.status(500).send(resp)
                    })
            } else {
                resp.message = "Invalid token."
                res.status(403).send(resp)
            }
        })
}
