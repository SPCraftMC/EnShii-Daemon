const { PrismaClient } = require('./client')
const dotenv = require("dotenv")
const prisma = new PrismaClient()
const logger = require("../util/logger")

dotenv.config()

//更新root用户
async function main() {
  await prisma.user.upsert({
    where: { name: process.env.ROOT_NAME },
    update: {},
    create: {
      name: process.env.ROOT_NAME,
      password: process.env.ROOT_PASSWORD,
      email: process.env.ROOT_EMAIL,
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

