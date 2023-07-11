import { cookieOptions } from "@/src/server/utils/api"
import cookie from "cookie"

/* Rotas públicas */
export default function handler(req, res) {
    switch (req.method) {
        case "POST":
            return handlePOST(req, res)
        default:
            return res.status(405).send("Error 405: Method not allowed")
    }
}

//Rota de logout
function handlePOST(req, res) {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("session_id", null, { ...cookieOptions, maxAge: 0 })
    )
    return res.status(200).json({ status: 200, message: "logout bem sucedido." })
}
