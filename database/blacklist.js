const { PrismaClient } = require('./client');
const prisma = new PrismaClient();
const logger = require ('../util/logger')

async function users() {
  try {
    const bannedUsers = await prisma.user.findMany({
      where: {
        rule: -1
      },
      select: {
        name: true
      }
    });

    return bannedUsers.map(user => user.name);
  } catch (error) {
    logger.error('Error retrieving banned users:', error);
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
