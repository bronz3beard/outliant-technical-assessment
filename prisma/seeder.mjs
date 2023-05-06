import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function clearDBAsync() {
  // Delete individual tables - reset all values to empty
  const deletions = []

  deletions.push(prisma.products.deleteMany())

  await prisma.$transaction(deletions)
}

async function main() {
  const products = []

  // Populate Products DB with 100 products

  for (let i = 0; i < 100; i++) {
    products.push({
      name: _randomText(2),
      price: _getRandomInt(100),
    })
  }

  await prisma.products.createMany({ data: products })
}

clearDBAsync()
  .then(async () => {
    main()

    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })

/* DB HELPERS */
function _getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"]
const allNumbers = [..."0123456789"]
const allChars = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha]
// modified from https:// gist.github.com/6174/6062387
function _randomText(words) {
  return [...Array(words)]
    .map((_j) => {
      return (
        [...Array(_getRandomInt(8) + 2)]
          // eslint-disable-next-line no-bitwise
          .map((_i) => allChars[(Math.random() * allChars.length) | 0])
          .join("")
      )
    })
    .join(" ")
}
