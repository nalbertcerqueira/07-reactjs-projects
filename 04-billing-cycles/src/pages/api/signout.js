import { cookieOptions } from "@/src/server/utils/api"
import cookie from "cookie"

/* Rotas públicas */
export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return handleGET(req, res)
        default:
            return res.status(405).send("Error 405: Method not allowed")
    }
}

//Rota de logout
function handleGET(req, res) {
    res.setHeader("Set-Cookie", [
        cookie.serialize("session_id", "", { ...cookieOptions, maxAge: 0 })
    ])
    return res.status(200).json({ status: 200, message: "logout bem sucedido." })
}
