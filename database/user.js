const sha256 = require('js-sha256')
const {PrismaClient} = require('./client')
const prisma = new PrismaClient()
const logger = require("../util/logger")
const {getId} = require("../modules/token");

function exist(result) {
    return result !== null;
}

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

async function all(token) {
    const query = await prisma.user.findUnique({
        where: {
            id: getId(token)
        },
        select: {
            name: true,
            id: true,
            email: true,
            linked_oauth: true
        }
    })
    const response = {
        name: query.name,
        id: query.id,
        email: query.email,
        linkedOauth: query.linked_oauth
    }
    return response
}

module.exports = {
    add: add,
    login: login,
    id: id,
    all: all
}
