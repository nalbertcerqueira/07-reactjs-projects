require("dotenv").config()
const express = require("express")
const fs = require("fs").promises
const path = require("path")
const { generateHash, cookieParser } = require("../utils/utils.js")
const apiRoutes = express.Router()

//Rotas da API
apiRoutes.options("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.ALLOWED_ORIGINS}`)
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE,PUT")
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Accept,X-Custom-Header,X-Requested-With,Origin,Content-Type"
    )
    return next()
})

apiRoutes.get("/", (req, res) => {
    return res.redirect("/todo/api/tasks")
})
apiRoutes.get("/tasks", async (req, res) => {
    const { user_id_todo: userId } = cookieParser(req.headers.cookie)
    const filePath = path.resolve(process.cwd(), "./data/tasks.json")
    const { description } = req.query
    let data

    //Lendo o arquivo data.json, disparando um erro em caso de falha
    //e filtrando o usuário com base no cookie enviado pela requisição
    try {
        data = JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }))[userId]
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }

    //Ordenando os dados do mais recente ao mais antigo
    data.tasks?.sort((a, b) => b.createdAt - a.createdAt)

    if (description !== "" && description !== null && description !== undefined) {
        const filteredTasks = data.tasks.filter((task) =>
            task.taskDescription.toUpperCase().match(description.toUpperCase())
        )
        return res.status(200).json(filteredTasks)
    }

    return res.status(200).json(data.tasks)
})
apiRoutes.post("/tasks", async (req, res) => {
    const { user_id_todo: userId } = cookieParser(req.headers.cookie)
    const filePath = path.resolve(process.cwd(), "./data/tasks.json")
    const keysScheme = ["taskDescription"]
    const body = req.body
    let data

    //Validando o corpo da requisição
    if (Object.keys(body).length === 0) {
        return res.status(400).json({
            status: 400,
            message: "Error 400: Bad request, empty fields not allowed"
        })
    }

    //Verificando se os dados enviados pelo client são válidos
    for (let key of keysScheme) {
        if (body[key] === "" || body[key] === undefined || body[key] === null)
            return res.status(400).json({
                status: 400,
                message: "Error 400: Bad request, empty fields not allowed"
            })
    }

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }))
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }

    //Gerando um id para a tarefa
    let newId = generateHash(20)
    let isIdRepeated = data[userId].tasks.find((task) => task.id === newId)

    while (isIdRepeated) {
        newId = generateHash(20)
        isIdRepeated = data[userId].tasks.find((task) => task.id === newId)
    }

    //Inserindo uma nova tarefa no array de tarefas do usuário
    data[userId].tasks.push({
        taskDescription: body.taskDescription,
        done: false,
        createdAt: Date.now(),
        id: newId
    })

    //Reescrevendo o arquivo data.json com os dados alterados
    try {
        await fs.writeFile(filePath, JSON.stringify(data), { encoding: "utf-8" })
        return res.status(200).json({ message: "Task added with success!", status: 200 })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error 500: Error during the writing file", status: 500 })
    }
})
apiRoutes.put("/tasks/:id", async (req, res) => {
    const { user_id_todo: userId } = cookieParser(req.headers.cookie)
    const filePath = path.resolve(process.cwd(), "./data/tasks.json")
    const keys = Object.keys(req.body)
    const { id: taskId } = req.params
    let data

    //Validando entradas vazias no corpo da requisição
    if (keys.length === 0) {
        return res.status(400).json({ message: "Error 400: Bad request", status: 400 })
    }

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }))
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }

    //Buscando a tarefa em data.json e devolvendo um erro em caso negativo
    let foundIndex = data[userId].tasks.findIndex((task) => task.id === taskId)
    if (foundIndex < 0) {
        return res.status(404).json({ message: "Error 404: Task not found", status: 404 })
    }

    //Alterando os dados da tarefa encontrada
    if (typeof req.body.done === "boolean") {
        data[userId].tasks[foundIndex].done = req.body.done
    } else {
        return res.status(400).json({ message: "Error 400: Bad request", status: 400 })
    }

    //Reescrevendo o arquivo data.json com os dados alterados
    try {
        await fs.writeFile(filePath, JSON.stringify(data), { encoding: "utf-8" })
        return res
            .status(200)
            .json({ message: "Task updated with success!", status: 200 })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error 500: Error during the writing file", status: 500 })
    }
})
apiRoutes.delete("/tasks/:id", async (req, res) => {
    const { user_id_todo: userId } = cookieParser(req.headers.cookie)
    const filePath = path.resolve(process.cwd(), "./data/tasks.json")
    const { id: taskId } = req.params
    let data

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }))
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }

    //Buscando a tarefa em data.json e devolvendo um erro em caso negativo
    let foundIndex = data[userId].tasks.findIndex((task) => task.id === taskId)
    if (!taskId || foundIndex < 0) {
        return res.status(404).json({ message: "Error 404: Task not found", status: 404 })
    }

    //Removendo a tarefa, cujo id foi passado na url, do array de tarefas do usuário
    data[userId].tasks = data[userId].tasks.filter((task) => task.id !== taskId)

    //Reescrevendo o arquivo data.json com os dados alterados
    try {
        await fs.writeFile(filePath, JSON.stringify(data), { encoding: "utf-8" })
        return res
            .status(200)
            .json({ message: "Task deleted with success!", status: 200 })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error 500: Error during the writing file", status: 500 })
    }
})

module.exports = apiRoutes
