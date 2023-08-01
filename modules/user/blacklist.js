const { verify } = require("../token");
const { blacklist } = require("../../database/db");

module.exports = (req, res) => {
  const resp = {
    status: false,
    message: "Internal server error.",
    data: {}
  };

  const params = req.body;

  verify(params.token)
    .then((status) => {
      if (status) {
        blacklist.users()
          .then((blackList) => {
            resp.status = true
            resp.message = ""
            resp.data = {
              users: blackList
            }
            res.status(200).send(resp)
          })
          .catch(() => {
            res.status(500).send(resp)
          });
      } else {
        resp.message = "Invalid token."
        res.status(403).send(resp)
      }
    })
}
