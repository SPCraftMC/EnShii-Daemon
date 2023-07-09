const token = new WeakMap();
const keys = [];

async function createToken(id) {
  let guid = '';
  for (let i = 1; i <= 32; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
  }
  token.set(id, {
    "id": id,
    "token": guid,
    "expried": Date.now() + 86400000
  });
  keys.push(id);
  return guid;
}

async function verify(id, tokenValue) {
  for (const key of keys) {
    const value = token.get(key);
    const i0 = (key === id);
    const i1 = (value.token === tokenValue);
    if (Date.now() >= value.expried) return false;
    else if (i0 && i1) return true;
  }
  return false;
}

async function getId(tokenValue) {
  for (const key of keys) {
    const value = token.get(key);
    const i0 = (key === id);
    const i1 = (value.token === tokenValue);
    if (i0 && i1) return key;
    else return null;
  }
}

setInterval(() => {
  for (const key of keys) {
    const value = token.get(key);
    if (Date.now() >= value.expried) {
      token.delete(key);
      keys.splice(keys.indexOf(key), 1);
    }
  }
});

module.exports = {
    createToken: createToken,
    verify: verify,
    getId: getId
};
