const verify = require("../token").verify

module.exports = (req, res) => {
    const params = req.body
    const id = params.id
    const token = params.token
    
    let resp = {
        status: false,
        message: "Invaild token.",
        data: {}
    }
    
    if (verify(id, token)) {
        resp.status = true
        resp.message = ""
    }
    
    res.status(200).send(resp)
}