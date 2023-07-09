const { PrismaClient } = require('./client')
const dotenv = require("dotenv")
const prisma = new PrismaClient()
const logger = require("../util/logger")

dotenv.config()

//检测id为0的根用户是否存在，并创建此用户
async function main() {
  await prisma.user.upsert({
    where: { name: process.env.ROOT_NAME },
    update: {},
    create: {
      name: process.env.ROOT_NAME,
      password: process.env.ROOT_PASSWORD,
      email: process.env.ROOT_EMAIL
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
