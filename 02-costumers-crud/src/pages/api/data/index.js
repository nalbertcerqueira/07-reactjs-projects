//Importando dependências
const { default: generateId } = require("../../../utils/utils.js")
const { writeFile } = require("fs").promises
const { join } = require("path")
const data = require("../../../../json/data.json")

//Manipulador de solicitações GET e POST
export default async function handler(req, res) {
    const method = req.method
    switch (method) {
        case "GET":
            return handleGET(res)
        case "POST":
            return handlePOST(req, res)
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
        return res
            .status(400)
            .send({ error: "only costumer registration is allowed in POST method" })
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
        return res.status(200).json({ message: "Costumer registered with success!" })
    } catch (error) {
        return res.status(500).json({ error: "Error during the writing file" })
    }
}
