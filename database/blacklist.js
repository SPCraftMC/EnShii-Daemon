const { PrismaClient } = require('./client');
const prisma = new PrismaClient();
const logger = require ('../util/logger')

async function users() {
  try {
    const blackList = await prisma.user.findMany({
      where: {
        rule: -1
      },
      select: {
        name: true,
        ban_info: true
      }
    });

    return blackList
  } catch (error) {
    logger.error('Error retrieving black list:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function baninfo(name) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: name
      },
      select: {
        ban_info: true
      }
    });

    if (user) {
      return user.ban_info;
    } else {
      return null;
    }
  } catch (error) {
    logger.error('Error retrieving ban info:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  users: users,
  baninfo: baninfo
};
