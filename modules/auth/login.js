const db = require('../../database/db')

module.exports = (req, res) => {
    const resp = {
        status: false,
        message: "International server error.",
        data: {
            token: null
        }
    }
    const params = req.body

/*    db.user.id(params.name)
        .then((id) => {
            if (id !== null) {
                return db.user.login(id, params.password)
                    .then((status) => {
                        if (status) {
                            resp.status = true
                            resp.message = ""
                            resp.data.token = db.token.createToken(id)
                            console.log(resp.data.token)
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
        })*/
        db.user.id(params.name)
        .then(async (id) => {
            if (id !== null) {
                try {
                    const status = await db.user.login(id, params.password);
                    if (status) {
                        resp.status = true;
                        resp.message = "";
                        resp.data.token = await db.token.createToken(id);
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

    
