// 未使用
const {verify} = require('../token')

module.exports = (req, res) => {
    const params = req.body
    const id = params.id
    const token = params.token

    let resp = {
        status: false,
        message: "Invaild token.",
        data: {}
    }
    verify(id, token).then((res) => {
        if (res) {
            resp.status = true
            resp.message = ""
        }
        res.status(200).send(resp)
    })
}
