const express = require("express")
const fs = require("fs").promises
const path = require("path")
const apiRoutes = express.Router()
const { generateHash, cookieParser, filterUserByCookie } = require("../utils/utils.js")

//Rotas da API
apiRoutes.get("/", (req, res) => {
    res.redirect("/api/tasks")
})

apiRoutes.get("/tasks", async (req, res) => {
    const { user_id_todo: userCookie } = cookieParser(req.headers.cookie)
    const filePath = path.resolve(__dirname, "../data/tasks.json")
    const { description } = req.query
    let data

    //Lendo o arquivo data.json, disparando um erro em caso de falha
    //e filtrando o usuário com base no cookie enviado pela requisição
    try {
        const rawData = await fs.readFile(filePath, { encoding: "utf-8" })
        data = filterUserByCookie({ cookie: userCookie, dataJSON: rawData }).userData
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }

    //Ordenando os dados do mais recente ao mais antigo
    data.tasks?.sort((a, b) => {
        return b.createdAt - a.createdAt
    })

    if (description !== "" && description !== null && description !== undefined) {
        const filteredTasks = data.tasks.filter((task) =>
            task.taskDescription.toUpperCase().match(description.toUpperCase())
        )
        return res.status(200).json(filteredTasks)
    }

    return res.status(200).json(data.tasks)
})
apiRoutes.post("/tasks", async (req, res) => {
    const { user_id_todo: userCookie } = cookieParser(req.headers.cookie)
    const keysScheme = ["taskDescription"]
    const body = req.body
    let filePath = path.resolve(__dirname, "../data/tasks.json")
    let foundUserIndex
    let foundUserData
    let rawData

    //Validando o copor da requisição
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

    //Lendo o arquivo data.json e filtrando os dados do usuário
    //de acordo com o cookie da requisição
    try {
        rawData = await fs.readFile(filePath, { encoding: "utf-8" })
        const { userData, index } = filterUserByCookie({
            cookie: userCookie,
            dataJSON: rawData
        })
        foundUserData = userData
        foundUserIndex = index
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }

    //Gerando um cookie para o client e verificando se o mesmo ja existe em data.json
    let newId = generateHash(20)
    let isIdRepeated = foundUserData.tasks.find((task) => task.id === newId)

    while (isIdRepeated) {
        newId = generateHash(20)
        isIdRepeated = foundUserData.tasks.find((task) => task.id === newId)
    }

    //Inserindo uma nova tarefa no array de tarefas do usuário
    foundUserData.tasks.push({
        taskDescription: body.taskDescription,
        done: false,
        createdAt: Date.now(),
        id: newId
    })

    //Alterando os dados brutos, e substituíndo as tasks do usuário
    //pelo foundUserData.tasks
    const newData = JSON.parse(rawData)
    newData[foundUserIndex].tasks = foundUserData.tasks

    //Rescrevendo o arquivo data.json com o novo cliente cadastrado
    try {
        await fs.writeFile(filePath, JSON.stringify(newData), {
            encoding: "utf-8"
        })
        return res.status(200).json({ message: "Task added with success!", status: 200 })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error 500: Error during the writing file", status: 500 })
    }
})
apiRoutes.put("/tasks/:id", async (req, res) => {
    const { id: taskId } = req.params
    const { user_id_todo: userCookie } = cookieParser(req.headers.cookie)
    const keys = Object.keys(req.body)
    let filePath = path.resolve(__dirname, "../data/tasks.json")
    let data
    let foundUserIndex

    //Validando entradas vazias no corpo da requisição
    if (keys.length === 0) {
        return res.status(400).json({ message: "Error 400: Bad request", status: 400 })
    }

    //Lendo o arquivo data.json e filtrando os dados do usuário
    //de acordo com o cookie da requisição
    try {
        const rawData = await fs.readFile(filePath, { encoding: "utf-8" })
        const { index } = filterUserByCookie({
            cookie: userCookie,
            dataJSON: rawData
        })
        data = JSON.parse(rawData)
        foundUserIndex = index
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }

    //Buscando a tarefa em data.json e devolvendo um erro em caso negativo
    let foundIndex = data[foundUserIndex].tasks.findIndex((task) => task.id === taskId)
    if (foundIndex < 0) {
        return res.status(404).json({ message: "Error 404: Task not found", status: 404 })
    }

    //Alterando os dados da tarefa encontrada
    if (typeof req.body.done === "boolean") {
        data[foundUserIndex].tasks[foundIndex].done = req.body.done
    }

    //Rescrevendo o arquivo data.json com os dados alterados
    try {
        await fs.writeFile(filePath, JSON.stringify(data), { encoding: "utf-8" })
        return res.status(200).json({ message: "Task updated with success!", status: 200 })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error 500: Error during the writing file", status: 500 })
    }
})
apiRoutes.delete("/tasks/:id", async (req, res) => {
    const { id: taskId } = req.params
    const { user_id_todo: userCookie } = cookieParser(req.headers.cookie)
    const filePath = path.resolve(__dirname, "../data/tasks.json")
    let data
    let foundUserIndex

    //Lendo o arquivo data.json e filtrando os dados do usuário
    //de acordo com o cookie da requisição
    try {
        const rawData = await fs.readFile(filePath, { encoding: "utf-8" })
        const { index } = filterUserByCookie({
            cookie: userCookie,
            dataJSON: rawData
        })
        foundUserIndex = index
        data = JSON.parse(rawData)
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }

    //Buscando o cliente em data.json e devolvendo um erro em caso negativo
    let foundIndex = data[foundUserIndex].tasks.findIndex((task) => task.id === taskId)
    if (!taskId || foundIndex < 0) {
        return res.status(404).json({ message: "Error 404: Task not found", status: 404 })
    }

    //Filtrando a lista de clientes de modo a não incluir o cliente com com o id
    //passado na URL
    data[foundUserIndex].tasks = data[foundUserIndex].tasks.filter(
        (task) => task.id !== taskId
    )
    // const filteredTasks = JSON.stringify({ tasks: array }, null, 4)

    //Rescrevendo o arquivo data.json com a nova lista de clientes
    try {
        await fs.writeFile(filePath, JSON.stringify(data), { encoding: "utf-8" })
        return res.status(200).json({ message: "Task deleted with success!", status: 200 })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error 500: Error during the writing file", status: 500 })
    }
})

//Adicionando um middleware para rotas inválidas da API
apiRoutes.use(function (req, res) {
    const allowedMethods = ["GET", "POST", "PUT", "DELETE"]
    if (!allowedMethods.includes(req.method)) {
        return res.status(405).json({ status: 405, message: "Error 405: method not allowed" })
    }
    return res.status(400).json({ status: 400, message: "Error 400: route not found" })
})

module.exports = apiRoutes
