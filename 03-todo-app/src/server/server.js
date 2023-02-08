//Importando dependências e funções
const express = require("express")
const { resolve } = require("path")
const apiRoutes = require("./routes/api.js")
const clientRoutes = require("./routes/client.js")
const { cookieHandler } = require("./middlewares/middlewares")

//Criando o servidor e definindo uma porta
const server = express()
const port = 3000

//Aplicando middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use("/public", express.static(resolve(__dirname, "./public")))

//Utilizando rotas e middlware configurados em routes e middlewares.js
server.use(cookieHandler)
server.use("/api", apiRoutes)
server.use("/", clientRoutes)

//Iniciando o serivdor na porta definida anteriormente
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})