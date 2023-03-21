import bcrypt from "bcrypt"
import { readFile } from "fs/promises"
import jwt from "jsonwebtoken"
import { resolve } from "path"
import { validateSigninSignup } from "../../server/middlewares/body-validators"

/* Rotas públicas */
export default function handler(req, res) {
    switch (req.method) {
        case "POST":
            return validateSigninSignup(req, res, handlePOST)
        default:
            return res.status(404).send("Error 405: Method not allowed")
    }
}

//Rota de login do usuário
async function handlePOST(req, res) {
    const email = req.body.email || ""
    const password = req.body.password || ""
    const filePath = resolve(__dirname, "../../../../data/users.json")
    let usersDB = []

    //Lendo o arquivo users.json ou retornando um erro em caso de falha
    try {
        usersDB = JSON.parse(await readFile(filePath, { encoding: "utf-8" }))
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [{ msg: error.message }]
        })
    }

    //Buscando o usuário com email fornecido no login ou retornando um erro
    //em caso negativo
    const foundUser = usersDB.users[email]
    if (!foundUser) {
        const error = new Error(`invalid email/password`)
        return res.status(401).json({
            status: 401,
            message: "Error 401: user unauthorized",
            errors: [{ msg: error.message }]
        })
    }

    //Validando se o hash da senha fornecido no login bate com o hash salvo em users.json
    try {
        const passwordValid = await bcrypt.compare(password, foundUser.password)
        if (!passwordValid) throw new Error("invalid email/password")
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: "Error 401: user unauthorized",
            errors: [{ msg: error.message }]
        })
    }

    //Criando o JWT que será enviando como um cookie para o client
    const payload = { username: foundUser.username, email }
    const token = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: "1d" })

    res.setHeader(
        "Set-Cookie",
        `session_id=${token}; SameSite=${process.env.COOKIE_SAME_SITE}; Path=${
            process.env.COOKIE_PATH
        }; HttpOnly; Max-Age=86400; Domain=${process.env.COOKIE_DOMAIN}; ${
            process.env.COOKIE_SECURE ? "Secure" : ""
        };`
    )
    return res
        .status(200)
        .json({ status: 200, message: "Success! You are now logged in", jwt: token })
}
