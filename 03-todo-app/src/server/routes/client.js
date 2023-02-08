const express = require("express")
const path = require("path")
const fs = require("fs").promises
const clientRoutes = express.Router()

//Rotas da aplicação
clientRoutes.get("*", async (req, res) => {
    const filePath = path.resolve(__dirname, "./index.html")
    try {
        let file = await fs.readFile(filePath, { encoding: "utf-8" })
        res.status(200).send(file)
    } catch (error) {
        res.setHeader("content-type", "text/plain; charset=utf-8")
        res.status(500).send("Error 500.\nServer internal error.")
    }
})

module.exports = clientRoutes
