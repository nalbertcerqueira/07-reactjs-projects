import { readFile } from "fs/promises"
import jwt from "jsonwebtoken"
import { join } from "path"

import { validateSummaryQuery } from "../../../server/middlewares/query-validators"
import { jwtValidationProtectedRoute } from "../../../server/middlewares/token-validation"
import { cookieParser } from "../../../server/utils/api"

/* Rotas protegidas por JWT */
export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return jwtValidationProtectedRoute(req, res, () =>
                validateSummaryQuery(req, res, handleGET)
            )
        default:
            return res
                .status(405)
                .json({ status: 405, message: "Error 405: method not allowed" })
    }
}

//Enviando o consolidado de créditos e débitos do usuário
async function handleGET(req, res) {
    const dataPath = join(process.cwd(), "data/data.json")
    const { session_id } = cookieParser(req.headers.cookie)
    const { username, email } = jwt.decode(session_id)
    const { sort_by, value } = req.query
    const summary = {}
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
    const userIndex = data.findIndex((user) => {
        return user.email === email && user.username === username
    })

    //Filtrando os resultados com base nas queries strings informadas na url
    const filteredBillings =
        sort_by && value
            ? data[userIndex].billings.filter((billing) => billing[sort_by] === value)
            : data[userIndex].billings

    summary.credits = filteredBillings
        .reduce((acc, billing) => {
            acc.push(...billing.credits)
            return acc
        }, [])
        .reduce((acc, credit) => {
            acc += credit.value
            return acc
        }, 0)
        .toFixed(2)

    summary.debts = filteredBillings
        .reduce((acc, billing) => {
            acc.push(...billing.debts)
            return acc
        }, [])
        .reduce((acc, debts) => {
            acc += debts.value
            return acc
        }, 0)
        .toFixed(2)

    //Enviando o consolidado de débitos e créditos ao client
    return res.status(200).json({
        summary: {
            credits: parseFloat(summary.credits),
            debts: parseFloat(summary.debts)
        }
    })
}
