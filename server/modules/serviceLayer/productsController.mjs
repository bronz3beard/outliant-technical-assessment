import * as productsRepository from "../dataAccessLayer/productsRepository.mjs"

const productsController = async (req, res) => {
  const { method } = req

  // TODO:: check user exists here and all routes if not throw error.
  switch (method) {
    case "POST":
      // Handle POST request to create a new products
      const { name, price, createdAt, updatedAt } = req.body
      try {
        const exerciseInput = {
          name,
          price,
          createdAt,
          updatedAt,
        }
        const products = await productsRepository.createProducts_NoIncludes(
          exerciseInput
        )
        return res.send({ success: true, products })
      } catch (error) {
        return res.status(400).send({ success: false, message: error })
      }
    case "GET":
      console.log(
        "🚀 ~ file: productsController.mjs:8 ~ productsController ~ method:",
        method
      )
      try {
        const products = await productsRepository.findManyProducts_NoIncludes()
        console.log(
          "🚀 ~ file: productsController.mjs:32 ~ productsController ~ products:",
          products
        )

        return res.send({ success: true, products })
      } catch (error) {
        console.log(
          "🚀 ~ file: productsController.mjs:39 ~ productsController ~ error:",
          error
        )
        return res.status(400).send({ success: false, message: error })
      }
    case "DELETE":
      const { id } = req.body
      try {
        const products = await productsRepository.deleteUniqueProducts(id)

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
