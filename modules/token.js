const logger = require("../util/logger")
const { config } = require('../config.js')

const delay = config.tokenDelay * 3600000

const localToken = []
async function createToken(id) {
  let guid = ''
  for (let i = 32; i--; ) {
    const n = Math.floor(Math.random() << 4).toString(16)
    guid += n
  }
  localToken[id] = {
    "token": guid,
    "expried": Date.now() + delay
  }
  //logger.info('A local token created')
  return guid
}

function watchDog(){
  for(let it = localToken.length; it--; ){
    let tmp = localToken[it]
    if(Date.now() >= tmp.expried){
      localToken.delete(it)
      logger.info('<#${it}>Token is out of date. Delete')
    }
  }
}

async function verify(id, token){
  let tokenToVerify = localToken[id].token
  if(token === tokenToVerify){
    return true
  } else {
    return false
  }
}

/*async function verify(token) {
  for (let it in token) {
    logger.info(`${it.token}, ${token}`)
    if (Date.now() >= it.expried) {
      token.delete(it)
      return false
    }
    else if (token === it.token) return true
  }
  return false
  
    token.forEach((it) => {
        const i0 = it === it.id
        const i1 = token === it.token
        if (Date.now() >= it.expried) return false
        else if (i0 && i1) return true
    })
    return false


}*/

/*async function verify(token) {
  return true
}*/

module.exports = {
  createToken: createToken,
  verify: verify,
  watchDog: watchDog
}
