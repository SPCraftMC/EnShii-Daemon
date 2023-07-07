const { PrismaClient } = require('./client')
const dotenv = require("dotenv")
const prisma = new PrismaClient()

dotenv.config()

//检测id为0的根用户是否存在，并创建此用户
async function main() {
  const initUser = await prisma.user.upsert({
    where: { id: 0 },
    update: {},
    create: {
      id: 0,
      name: process.env.ROOT_NAME,
      password: process.env.ROOT_PASSWORD,
      email: process.env.ROOT_EMAIL
    },
  })
  console.log({ initUser })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
