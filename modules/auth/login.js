const db = require('../database/db')
const token = require('../token')
const logger = require("../../util/logger")

module.exports = (req, res) => {
  const resp = {
    status: false,
    message: "International server error.",
    data: {
      token: null,
      id: null
    }
  }
  const params = req.body

  db.user.id(params.name)
    .then(async (id) => {
      if (id !== null) {
        try {
          let status = await db.user.login(id, params.password);
          if (status) {
            logger.info(`(#${id}) Loggined`)
            resp.status = true;
            resp.message = "";
            resp.data.token = await token.createToken(id);
            resp.data.id = id;
            res.status(200).send(resp);
          } else {
            resp.message = "Invalid password.";
            res.status(403).send(resp);
          }
        } catch (error) {
          resp.message = `Error while querying the database: ${error.message}`;
          res.status(500).send(resp);
        }
      } else {
        resp.message = "User not found.";
        res.status(403).send(resp);
      }
    })
    .catch((error) => {
      resp.message = `Error while querying the database: ${error.message}`;
      res.status(500).send(resp);
    })
}


