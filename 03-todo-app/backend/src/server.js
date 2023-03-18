//Importando dependências e funções
require("dotenv").config()
const express = require("express")
const apiRoutes = require("./routes/api.js")
const { enableCORS, cookieHandler } = require("./middlewares/middlewares.js")

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
