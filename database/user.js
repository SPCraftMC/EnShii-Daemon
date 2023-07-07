const sha256 = require('js-sha256')
const { PrismaClient } = require('./client')
const prisma = new PrismaClient()
const logger = require("../util/logger")

function exist(result) {
  return result !== null;
}

async function add(userData) {
  try {
    const result = await prisma.user.create({
      data: {
        name: userData.name,
        password: userData.password,
        email: userData.email, // 修正拼写错误
      },
    })
    return true
  } catch (error) {
    logger.error('Failed to add user data: ' + error.message);
    return false
  }
}

async function login(name, password) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        name: name,
      },
      select: {
        name: true,
        password: true,
      },
    })
    if (exist(result)) {
      return (sha256(result.password) === password)
    } else return false;
  } catch (error) {
    throw new Error("Error while comparing credentials: " + error.message);
  }
}

async function id(name) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        name: name,
      },
      select: {
        id: true,
      },
    })
    logger.warn(result.id) // 修改为 logger.warn(result.id)
    if (exist(result)) {
      return result.id
    } else {
      return null
    }
  } catch (error) {
    logger.error(error.message)
    return null
  }
}

module.exports = {
  add: add,
  login: login,
  id: id
}
