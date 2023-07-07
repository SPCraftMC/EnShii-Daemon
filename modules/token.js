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

async function verify(id, token) {
    token.forEach((it) => {
        const i0 = it === it.id
        const i1 = token === it.token
        if (Date.now() >= it.expried) return false
        else if (i0 && i1) return true
    })
    return false
}

module.exports = {
    createToken: createToken,
    verify: verify
}