import { readFile, writeFile } from "fs/promises"
import { decodeJwt } from "jose"
import { join } from "path"

import { setTransactionsIds } from "@/src/server/utils/api"

/* Rotas protegidas por JWT */
export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return handleGET(req, res)
        case "DELETE":
            return handleDELETE(req, res)
        case "PUT":
            return handlePUT(req, res)
        default:
            return res.status(405).send({ status: 405, message: "Error 405: method not allowed" })
    }
}

//Consumo de dados de um ciclo de pagamentos com base em seu ID
async function handleGET(req, res) {
    const dataPath = join(process.cwd(), "data/data.json")
    const { session_id } = req.cookies
    const jwtPayload = decodeJwt(session_id)
    const { email } = jwtPayload
    const { id } = req.query
    let data = {}

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" })).data
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }

    //Buscando o os dados com base no usuário
    const foundUser = data[email]

    //Buscando o ciclo de pagamentos com baseado ID informado
    const foundBilling = foundUser.billings.find((billing) => billing.id === id)
    if (!foundBilling) {
        return res.status(404).json({
            status: 404,
            message: "Error 404: content not found",
            errors: [`ciclo de pagamento com id ${id} não foi encontrado.`]
        })
    }

    return res.status(200).json({ billing: foundBilling })
}

//Alterando os dados de um ciclo de pagamentos com base no ID
async function handlePUT(req, res) {
    const dataPath = join(process.cwd(), "data/data.json")
    const body = JSON.parse(JSON.stringify(req.body))
    const { session_id } = req.cookies
    const jwtPayload = decodeJwt(session_id)
    const { email } = jwtPayload
    const { id } = req.query
    let data = {}

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" })).data
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }

    //Buscando o usuário correspondente ao email informado
    const foundUser = data[email]

    //Buscando o ciclo de pagamentos com base no ID informado
    const foundBillingIndex = foundUser.billings.findIndex((billing) => billing.id === id)
    if (foundBillingIndex < 0) {
        return res.status(404).json({
            status: 404,
            message: "Error 404: content no found",
            errors: [`ciclo de pagamento com id ${id} não foi encontrado.`]
        })
    }

    //Criando um id para cada nova transação criada pelo usuário
    ;["credits", "debts"].forEach((type) => {
        if (body[type]) {
            body[type] = [...setTransactionsIds(body[type])]
            for (let transaction of body[type]) {
                transaction.value = parseFloat(transaction.value)
            }
        } else {
            body[type] = []
        }
    })

    foundUser.billings[foundBillingIndex] = { id, ...body }

    //Reescrevendo o arquivo data.json e enviando uma resposta ao client
    try {
        await writeFile(dataPath, JSON.stringify({ data }), { encoding: "utf-8" })
        return res
            .status(200)
            .json({ status: 200, message: "Ciclo de pagamento atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }
}

//Removendo um ciclo de pagamentos através do ID informado
async function handleDELETE(req, res) {
    const dataPath = join(process.cwd(), "data/data.json")
    const { session_id } = req.cookies
    const jwtPayload = decodeJwt(session_id)
    const { email } = jwtPayload
    const { id } = req.query
    let data = {}

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" })).data
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }

    //Buscando os dados do usuário com base no email informado
    const foundUser = data[email]

    //Buscando o ciclo de pagamentos com base no ID informado
    const foundBilling = foundUser.billings.find((billing) => billing.id === id)
    if (!foundBilling) {
        return res.status(404).json({
            status: 404,
            message: "Error 404: content not found",
            errors: [`ciclo de pagamento com id ${id} não foi encontrado.`]
        })
    }

    //Excluindo o ciclo de pagamentos
    foundUser.billings = foundUser.billings.filter((billing) => billing.id !== id)

    //Reescrevendo o arquivo data.json e enviando uma resposta ao client
    try {
        await writeFile(dataPath, JSON.stringify({ data }), { encoding: "utf-8" })
        return res
            .status(200)
            .json({ status: 200, message: "Ciclo de pagamento removido com sucesso!" })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }
}
