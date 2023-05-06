import express from "express"
import ViteExpress from "vite-express"

import productsController from "./modules/serviceLayer/productsController.mjs"

const PORT = 3000
const app = express()

app.use("/api/products", productsController)

ViteExpress.config({ printViteDevServerHost: false })

ViteExpress.listen(app, PORT, () =>
  console.log(`> Ready on http://localhost:${PORT}`)
)
