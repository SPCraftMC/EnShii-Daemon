const { PrismaClient } = require('./client')
const prisma = new PrismaClient()
const logger = require("../../util/logger")
const { config } = require('../../config.js')

//更新root用户
async function main() {
  await prisma.user.upsert({
    where: { name: config.users.root.name },
    update: {},
    create: {
      name: config.users.root.name,
      password: config.users.root.password,
      email: config.users.root.email,
      rule: 3
    },
  })
}

main()
  .then(async () => {
  })
  .catch(async (e) => {
    logger.error(e)
    process.exit(1)
  })

