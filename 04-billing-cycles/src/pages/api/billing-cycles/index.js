import { readFile, writeFile } from "fs/promises"
import jwt from "jsonwebtoken"
import { join } from "path"

import { validateBillingCycle } from "@/src/server/middlewares/body-validators"
import { validatePaginationQuery } from "@/src/server/middlewares/query-validators"
import { cookieParser, generateHash, setTransactionsIds } from "@/src/server/utils/api"
import { jwtValidationProtectedRoute } from "../../../server/middlewares/token-validation"

/* Rotas protegidas por JWT */
export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return jwtValidationProtectedRoute(req, res, () =>
                validatePaginationQuery(req, res, handleGET)
            )
        case "POST":
            return jwtValidationProtectedRoute(req, res, () =>
                validateBillingCycle(req, res, handlePOST)
            )
        default:
            return res
                .status(405)
                .send({ status: 405, message: "Error 405: method not allowed" })
    }
}

//Adicionando um novo ciclo de pagamentos
async function handlePOST(req, res) {
    const dataPath = join(process.cwd(), "data/data.json")
    const body = JSON.parse(JSON.stringify(req.body))
    const { session_id } = cookieParser(req.headers.cookie)
    const { email } = jwt.decode(session_id)
    let data = {}

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" })).data
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [{ msg: error.message }]
        })
    }

    //Buscando o usuário com base no email fornecido
    const foundUser = data[email]

    //Gerando um id para cada débito e crédito adicionado pelo usuário
    ;["credits", "debts"].forEach((type) => {
        if (body[type]) {
            body[type] = [...setTransactionsIds(body[type])]
        } else {
            body[type] = []
        }
    })

    //Gerando um id referente ao ciclo de pagamento
    let newBillingId = generateHash(15)
    let billingIdRepeated = foundUser.billings.find((billing) => billing.id === newBillingId)
    while (billingIdRepeated) {
        newBillingId = generateHash(15)
        billingIdRepeated = foundUser.billings.find((billing) => billing.id === newBillingId)
    }

    foundUser.billings.push({ ...body, id: newBillingId })

    //Reescrevendo o arquivo data.json e enviando uma resposta ao client
    try {
        await writeFile(dataPath, JSON.stringify({ data }), { encoding: "utf-8" })
        return res
            .status(200)
            .json({ status: 200, message: "Ciclo de pagamento cadastrado com sucesso!" })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [{ msg: error.message }]
        })
    }
}

//Enviando todos os dados de ciclos de pagamentos do usuário
async function handleGET(req, res) {
    const dataPath = join(process.cwd(), "data/data.json")
    const { session_id } = cookieParser(req.headers.cookie)
    const { email } = jwt.decode(session_id)
    const { page, limit } = req.query
    let data = {}

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" })).data
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error]
        })
    }

    const foundUser = data[email]

    //Determinando o índice inicial e final para filtrar os dados
    //com base na paginação
    const begin = page && limit ? (page - 1) * limit : 0
    const end = page && limit ? page * limit : undefined

    //Ordenando os dados do mais recente ao mais antigo com base no mês e ano
    foundUser.billings.sort((a, b) => {
        const timestampA = new Date(a.year, a.month - 1).valueOf()
        const timestampB = new Date(b.year, b.month - 1).valueOf()
        return timestampB - timestampA
    })

    //Enviando os dados filtrados ao usuário com base na paginação
    return res.status(200).json(foundUser.billings.slice(begin, end))
}
