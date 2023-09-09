const { PrismaClient } = require('./client');
const prisma = new PrismaClient();
const logger = require('../../util/logger')

//查询黑名单用户和信息
async function list() {
  try {
    const blackList = await prisma.user.findMany({
      where: {
        rule: -1
      },
      select: {
        name: true,
        ban_info: true
      }
    })
    return blackList
  } catch (error) {
    logger.error('Error retrieving black list:', error);
    throw error;
  }
}

module.exports = {
  list: list
}
