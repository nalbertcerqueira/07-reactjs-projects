/* Rotas públicas */
export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return handleGET(req, res)
        default:
            return res.status(404).send("Error 405: Method not allowed")
    }
}

//Rota de logout
function handleGET(req, res) {
    res.setHeader("Set-Cookie", `session_id=0; Path=/; Max-Age=0`)
    res.status(200).json({ status: 200, message: "Logout bem sucedido." })
}
