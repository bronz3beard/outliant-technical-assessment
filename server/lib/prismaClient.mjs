import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

// export default prisma

let client

const getAppPrismaClient = async () => {
  if (client === undefined) {
    console.log("<prisma.connect>")
    client = new PrismaClient()
    await client.$connect()
    console.log("</prisma.connect>")
  }

  return client
}

export default getAppPrismaClient
