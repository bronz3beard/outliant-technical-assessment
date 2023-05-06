import getAppPrismaClient from "../../lib/prismaClient.mjs"

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

const findManyProducts_NoIncludes = async () => {
  const prisma = await getAppPrismaClient()

  console.info("START: prisma.products.findMany")
  const data = await prisma.products.findMany()
  console.info("END: prisma.products.findMany")

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

const updateProducts_NoIncludes = async (product) => {
  const prisma = await getAppPrismaClient()

  console.info("START: prisma.products.update")
  const { id, name, price, createdAt, updatedAt } = product

  const data = await prisma.products.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      createdAt,
      updatedAt,
    },
  })
  console.info("END: prisma.products.update")

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
  createProducts_NoIncludes,
  findManyProducts_NoIncludes,
  findUniqueProducts,
  updateProducts_NoIncludes,
  deleteUniqueProducts,
}
