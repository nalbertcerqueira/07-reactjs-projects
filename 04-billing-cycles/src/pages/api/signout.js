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
    res.setHeader(
        "Set-Cookie",
        `session_id=0; SameSite=${process.env.COOKIE_SAME_SITE}; Path=${
            process.env.COOKIE_PATH
        }; HttpOnly; Max-Age=0; Domain=${process.env.COOKIE_DOMAIN}; ${
            process.env.COOKIE_SECURE ? "Secure" : ""
        };`
    )
    res.status(200).json({ status: 200, message: "Logout bem sucedido." })
}
