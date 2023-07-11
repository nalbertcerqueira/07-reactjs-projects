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
    res.setHeader("Set-Cookie", cookie.serialize("session_id", null, { maxAge: 0, path: "/" }))
    return res.status(200).json({ status: 200, message: "logout bem sucedido." })
}
