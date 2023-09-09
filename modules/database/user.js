const sha256 = require('js-sha256')
const { PrismaClient } = require('./client')
const prisma = new PrismaClient()
const logger = require("../../util/logger")

//添加用户
async function add(userData) {
  try {
    await prisma.user.create({
      data: {
        name: userData.name,
        password: userData.password,
        email: userData.email,
      },
    })
    return true
  } catch (error) {
    logger.error('Failed to add user data: ' + error.message)
    return false
  }
}

//登录
async function login(id, password) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        password: true,
      },
    })
    if (result) {
      return (sha256(result.password) === password)
    } else return false;
  } catch (error) {
    throw new Error("Error while comparing credentials: " + error.message);
  }
}

//通过用户名查询id
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
    if (result) {
      return result.id
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

async function all(id) {
  const result = await prisma.user.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      rule: true,
      name: true,
      email: true,
      linked_oauth: true
    }
  })
  return result
}

module.exports = {
  add: add,
  login: login,
  id: id,
  all: all
}
