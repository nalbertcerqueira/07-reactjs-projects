//Importando dependências
const { default: generateId } = require("../../utils/utils.js")
const { writeFile } = require("fs").promises
const { join } = require("path")
const data = require("../../../json/data.json")

//Manipulador geral de solicitações da API
export default async function handler(req, res) {
    const method = req.method
    switch (method) {
        case "GET":
            return handleGET(res)
        case "POST":
            return handlePOST(req, res)
        case "PUT":
            return handlePUT(req, res)
        case "DELETE":
            return handleDELETE(req, res)
        default:
            return res.status(405).json({ error: `Method ${method} not allowed` })
    }
}

//Manipuladores específicos por método HTTP
async function handleGET(res) {
    try {
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
}
async function handlePOST(req, res) {
    const filePath = join(process.cwd(), "json/data.json")
    const costumer = { ...req.body }

    //Se houver um ID, não será um cadastro de cliente (POST) e portanto um erro é retornado
    if (costumer.id) {
        return res.status(400).send({ error: "only new costumers are allowed in POST method" })
    }

    //Gerando um ID para o novo cliente e verificando se o mesmo ja existe em data.json
    let newId = generateId(20)
    let isIdRepeated = data.costumers.find((costumer) => costumer.id === newId)

    while (isIdRepeated) {
        newId = generateId(20)
    }

    const newData = {
        costumers: [...data.costumers, { ...costumer, id: newId }]
    }

    //Rescrevendo o arquivo data.json com o novo cliente cadastrado
    try {
        await writeFile(filePath, JSON.stringify(newData, null, 4), { encoding: "utf-8" })
        return res.status(200).json({ response: "POST data sucessful!" })
    } catch (error) {
        return res.status(500).json({ error: "Error during the writing file" })
    }
}
async function handlePUT(req, res) {
    const filePath = join(process.cwd(), "json/data.json")
    const costumerId = req.body.id

    //Buscando o cliente em data.json e devolvendo um erro em caso negativo
    let foundIndex = data.costumers.findIndex((costumer) => costumer.id === costumerId)
    if (foundIndex < 0) return res.status(404).json({ error: "Costumer not found" })

    //Alterando os dados do cliente encontrado
    let foundCostumer = { ...data.costumers[foundIndex] }
    const newData = {
        costumers: [...data.costumers]
    }
    newData.costumers[foundIndex] = { ...foundCostumer, ...req.body }

    //Rescrevendo o arquivo data.json
    try {
        await writeFile(filePath, JSON.stringify(newData, null, 4), { encoding: "utf-8" })
        return res.status(200).json({ response: "PUT data sucessful!" })
    } catch (error) {
        return res.status(500).json({ error: "Error during the writing file" })
    }
}
async function handleDELETE(req, res) {
    const filePath = join(process.cwd(), "json/data.json")
    const costumerId = req.query.id

    //Buscando o cliente em data.json e devolvendo um erro em caso negativo
    let foundIndex = data.costumers.findIndex((costumer) => costumer.id === costumerId)
    if (!costumerId || foundIndex < 0) {
        return res.status(404).json({ error: "Costumer not found" })
    }

    //Filtrando a lista de clientes de modo a não incluir o cliente com id === costumerId
    const array = data.costumers.filter((costumer) => costumer.id !== costumerId)
    const filteredCostumers = JSON.stringify({ costumers: array }, null, 4)

    //Rescrevendo o arquivo data.json com a nova lista de clientes
    try {
        await writeFile(filePath, filteredCostumers, { encoding: "utf-8" })
        return res.status(200).json({ response: "Costumer deleted!" })
    } catch (error) {
        return res.status(500).json({ error: "Error during the writing file" })
    }
}
