import { readFile } from "fs/promises"
import jwt from "jsonwebtoken"
import { join } from "path"

import { jwtValidationProtectedRoute } from "../../../server/middlewares/token-validation"
import { cookieParser } from "../../../server/utils/api"

/* Rotas protegidas por JWT */
export default function handler(req, res) {
    if (req.method === "GET") return jwtValidationProtectedRoute(req, res, handleGET)
    return res.status(405).send({ status: 405, message: "Error 405: method not allowed" })
}

//Enviando o total de cíclos de pagamentos do usuário ao client
async function handleGET(req, res) {
    const dataPath = join(process.cwd(), "data/data.json")
    const { session_id } = cookieParser(req.headers.cookie)
    const { username, email } = jwt.decode(session_id)

    try {
        const data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" })).data
        const userIndex = data.findIndex((user) => {
            return user.email === email && user.username === username
        })
        return res.status(200).json({ billingCount: data[userIndex].billings.length })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [{ msg: error.message }]
        })
    }
}
