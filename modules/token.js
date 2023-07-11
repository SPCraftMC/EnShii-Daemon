const logger = require("../util/logger")

const token = []
async function createToken(id) {
    let guid = ''
    for (let i = 1; i <= 32; i++) {
        const n = Math.floor(Math.random() * 16.0).toString(16)
        guid += n
    }
    token.push({
        "id": id,
        "token": guid,
        "expried": Date.now() + 86400000
    })
    return guid
}

async function verify(token) {
  for (let it in token) {
    logger.info(`${it.token}, ${token}`)
    if (Date.now() >= it.expried) {
      token.delete(it)
      return false
    }
    else if (token === it.token) return true
  }
  return false
  /**
    token.forEach((it) => {
        const i0 = it === it.id
        const i1 = token === it.token
        if (Date.now() >= it.expried) return false
        else if (i0 && i1) return true
    })
    return false
*/
}

module.exports = {
    createToken: createToken,
    verify: verify
}