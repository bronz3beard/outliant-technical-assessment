import * as productsRepository from "../dataAccessLayer/productsRepository.mjs"

const productsController = async (req, res) => {
  const { method, body, query } = req

  switch (method) {
    case "POST":
      if (Boolean(query.delete)) {
        const { id } = body
        try {
          const products = await productsRepository.deleteUniqueProducts(id)

          return res.send({ success: true, products })
        } catch (error) {
          return res.status(400).send({ success: false, message: error })
        }
      }
      if (Boolean(query.update)) {
        try {
          const { id, name, price, createdAt, updatedAt } = body
          const productsInput = {
            id,
            name,
            price,
            createdAt,
            updatedAt,
          }

          const products = await productsRepository.updateProducts_NoIncludes(
            productsInput
          )

          return res.send({ success: true, products })
        } catch (error) {
          return res.status(400).send({ success: false, message: error })
        }
      } else {
        try {
          const { name, price, createdAt, updatedAt } = body

          const productsInput = {
            name,
            price,
            createdAt,
            updatedAt,
          }
          const products = await productsRepository.createProducts_NoIncludes(
            productsInput
          )
          return res.send({ success: true, products })
        } catch (error) {
          return res.status(400).send({ success: false, message: error })
        }
      }
    case "GET":
      try {
        const products = await productsRepository.findManyProducts_NoIncludes()

        return res.send({ success: true, products })
      } catch (error) {
        return res.status(400).send({ success: false, message: error })
      }
    default: {
      res.setHeader("Allow", ["OPTIONS"])
      return res
        .status(405)
        .send({ success: false, message: `Method ${method} Not Allowed` })
    }
  }
}

export default productsController
