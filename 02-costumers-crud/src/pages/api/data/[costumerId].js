//Importando dependências
const { writeFile } = require("fs").promises
const { join } = require("path")
const data = require("../../../../json/data.json")

//Manipulador de solicitações PUT e DELETE
export default async function handler(req, res) {
    const method = req.method
    switch (method) {
        case "PUT":
            return handlePUT(req, res)
        case "DELETE":
            return handleDELETE(req, res)
        default:
            return res.status(405).json({ error: `Method ${method} not allowed` })
    }
}

//Manipuladores específicos por método HTTP
async function handlePUT(req, res) {
    const filePath = join(process.cwd(), "json/data.json")
    const costumerId = req.query.costumerId

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
        return res.status(200).json({ message: "Costumer data updated with success!" })
    } catch (error) {
        return res.status(500).json({ error: "Error during the writing file" })
    }
}
async function handleDELETE(req, res) {
    const filePath = join(process.cwd(), "json/data.json")
    const costumerId = req.query.costumerId

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
        return res.status(200).json({ message: "Costumer deleted with success!" })
    } catch (error) {
        return res.status(500).json({ error: "Error during the writing file" })
    }
}
