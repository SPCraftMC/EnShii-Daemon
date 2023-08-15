const sha256 = require('js-sha256')
const { PrismaClient } = require('./client')
const prisma = new PrismaClient()
const logger = require("../../util/logger")
const { getId } = require("../token");

function exist(result) {
    return result !== null;
}

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
        logger.error('Failed to add user data: ' + error.message);
        return false
    }
}

//登陆
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
        if (exist(result)) {
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
        if (exist(result)) {
            return result.id
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

//原本是根据token组中id查询用户数据，现在暂时改为根据用户名
async function all(name) {
    const query = await prisma.user.findUnique({
        where: {
            name: name
        },
        select: {
            id: true,
            rule: true,
            name: true,
            email: true,
            linked_oauth: true
        }
    })
    const result = {
        id: query.id,
        rule: query.rule,
        name: query.name,
        email: query.email,
        linkedOauth: query.linked_oauth
    }
    return result
}

module.exports = {
    add: add,
    login: login,
    id: id,
    all: all
}
