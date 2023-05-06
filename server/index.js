import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import ViteExpress from "vite-express"

import productsController from "./modules/serviceLayer/productsController.mjs"

const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
// "urlencoded" will take everything from the query "?thing=a&this=b"
// and then put it in an object for you.
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productsController)

ViteExpress.config({ printViteDevServerHost: false })

ViteExpress.listen(app, PORT, () =>
  console.log(`> Ready on http://localhost:${PORT}`)
)
