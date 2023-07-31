import { mongoClient } from "@/configs/db-config"
import { cookieOptions, generateJWT } from "@/src/server/utils/api"
import bcrypt from "bcrypt"
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

//Rota de login do usuário
async function handlePOST(req, res) {
    await mongoClient.connect()

    const email = (req.body.email || "").toLowerCase().trim()
    const password = req.body.password || ""
    const userCollection = mongoClient.db.collection("users")

    //Buscando o usuário com email fornecido ou retornando um erro em caso negativo
    const foundUser = await userCollection.findOne({ email })
    if (!foundUser) {
        return res.status(401).json({
            status: 401,
            message: "Error 401: user unauthorized",
            errors: ["email ou senha inválidos."]
        })
    }

    //Validando se o hash da senha fornecido no login bate com o hash salvo no banco de dados
    const passwordValid = await bcrypt.compare(password, foundUser.password)
    if (!passwordValid) {
        return res.status(401).json({
            status: 401,
            message: "Error 401: user unauthorized",
            errors: ["email ou senha inválidos."]
        })
    }

    //Criando o JWT que será enviando como um cookie para o cliente
    const payload = { id: foundUser._id.toString(), username: foundUser.username, email }
    const token = await generateJWT(
        payload,
        process.env.AUTH_SECRET,
        parseInt(process.env.COOKIE_DURATION)
    )

    res.setHeader("Set-Cookie", [cookie.serialize("session_id", token, { ...cookieOptions })])

    return res.status(200).json({ status: 200, message: "login bem sucedido!" })
}
