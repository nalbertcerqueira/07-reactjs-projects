import { readFile } from "fs/promises"
import { decodeJwt } from "jose"
import { join } from "path"

export default function hanlder(req, res) {
    switch (req.method) {
        case "GET":
            return handleGET(req, res)
        default:
            return res.status(405).send("Error 405: Method not allowed")
    }
}

//Rota de validação do token JWT
async function handleGET(req, res) {
    const usersDBPath = join(process.cwd(), "data/users.json")
    const { session_id } = req.cookies
    const jwtPayload = decodeJwt(session_id)
    const { email } = jwtPayload
    let usersDB = []

    //Lendo os arquivos data.json e users.json ou retornando um erro em caso de falha
    try {
        usersDB = JSON.parse(await readFile(usersDBPath, { encoding: "utf-8" }))
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }

    const foundUser = usersDB.users[email.trim()]

    if (!foundUser) {
        return res.status(404).json({
            status: 404,
            message: "Error 404: user not found",
            errors: [`usuário com id ${email} não foi encontrado.`]
        })
    }

    return res.status(200).json({ username: foundUser.username, email: foundUser.email })
}
