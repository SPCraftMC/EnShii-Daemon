const { PrismaClient } = require('./client')
const prisma = new PrismaClient()
const logger = require("../../util/logger")
const { config } = require('../../config.js')

//更新root用户
async function main() {
  await prisma.user.upsert({
    where: { name: config.root.name },
    update: {},
    create: {
      name: config.root.name,
      password: config.root.password,
      email: config.root.email,
      rule: 3
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    logger.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

