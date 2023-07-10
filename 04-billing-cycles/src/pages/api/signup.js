import { mongoClient } from "@/configs/db-config"
import { User } from "@/src/server/schemas/db/user"
import bcrypt from "bcrypt"

/* Rotas públicas */
export default function handler(req, res) {
    switch (req.method) {
        case "POST":
            return handlePOST(req, res)
        default:
            return res.status(405).send("Error 405: Method not allowed")
    }
}

//Rota para cadastro de usuários
async function handlePOST(req, res) {
    await mongoClient.connect()

    const { username, email, password } = req.body
    const userCollection = mongoClient.db.collection("users")

    //Verificando se o email fornecido já possui um registro no banco de dados
    const query = { email: email.trim() }
    const existingUser = await userCollection.findOne(query)
    if (existingUser) {
        return res.status(409).json({
            status: 409,
            message: "Error 409: conflict",
            errors: ["o email fornecido já possui um cadastro em nosso sistema."]
        })
    }

    //Criando o hash da senha do usuário ou enviando um erro em caso de falha
    const newUser = new User(username, email)
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        newUser.password = hash
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }

    //Inserindo o novo usuário no banco de dados
    try {
        await userCollection.insertOne(newUser)
        return res
            .status(200)
            .json({ status: 200, message: "novo usuário registrado com sucesso!" })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }
}
