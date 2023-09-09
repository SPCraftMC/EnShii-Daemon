const db = require('../database/db')
const logger = require("../../util/logger")

module.exports = (req, res) => {
  const resp = {
    status: false,
    message: "International server error.",
    data: {}
  }
  const params = req.body
  if (params.email.match("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$")) {
    const data = {
      name: params.name,
      password: params.password,
      email: params.email,
    }
    db.user.add(data).then((status) => {
      if (status) {
        logger.info(`(${params.name}) Registered`)
        resp.status = true
        resp.message = ""
        res.status(200)
      } else res.status(500)
      res.send(resp)
    })
  } else {
    resp.message = "Invaild email provided."
    res.status(403).send(resp)
  }
}
