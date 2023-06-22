import { jwtValidation } from "../../server/middlewares/token-validation"

/* Rotas públicas */
export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return handleGET(req, res)
        default:
            return res.status(405).send("Error 405: Method not allowed")
    }
}

//Rota de validação do token JWT
async function handleGET(req, res) {
    const response = await jwtValidation(req)
    return res.status(response.status).json(response)
}
