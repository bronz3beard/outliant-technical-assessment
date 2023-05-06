import getAppPrismaClient from "../../lib/prismaClient.mjs"

const findManyProducts_NoIncludes = async () => {
  const prisma = await getAppPrismaClient()

  console.info("START: prisma.products.findMany")
  const data = await prisma.products.findMany()
  console.info("END: prisma.products.findMany")

  return data
}

const createProducts_NoIncludes = async (product) => {
  const prisma = await getAppPrismaClient()

  console.info("START: prisma.products.create")
  const { name, price, createdAt, updatedAt } = product
  const data = await prisma.products.create({
    data: { name, price, createdAt, updatedAt },
  })
  console.info("END: prisma.products.create")

  return data
}

const findUniqueProducts = async (id) => {
  const prisma = await getAppPrismaClient()

  console.info("START: prisma.products.findMany")
  const data = await prisma.products.findUnique({
    where: {
      id,
    },
  })
  console.info("END: prisma.products.findMany")

  return data
}

const deleteUniqueProducts = async (id) => {
  const prisma = await getAppPrismaClient()

  console.info("START: prisma.products.findMany")
  const data = await prisma.products.delete({
    select: {
      id: true,
    },
    where: {
      id,
    },
  })
  console.info("END: prisma.products.findMany")

  return data
}

export {
  findManyProducts_NoIncludes,
  createProducts_NoIncludes,
  findUniqueProducts,
  deleteUniqueProducts,
}
