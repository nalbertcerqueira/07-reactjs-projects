//Importando dependências e funções
const express = require("express")
const { resolve } = require("path")
const apiRoutes = require("./routes/api.js")
const { enableCORS, cookieHandler } = require("./middlewares/middlewares.js")

require("dotenv").config({ path: resolve(process.cwd(), "./.env.local") })
const server = express()

//Aplicando middlewares
server.set("trust proxy", true)
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(enableCORS())
server.use(cookieHandler)
server.use("/todo/api", apiRoutes)

//Iniciando o serivdor na porta definida em .env
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})
