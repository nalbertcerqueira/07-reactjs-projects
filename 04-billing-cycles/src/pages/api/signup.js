import bcrypt from "bcrypt"
import { readFile, writeFile } from "fs/promises"
import { join } from "path"

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
    const { username, email, password, confirmPassword } = req.body
    const usersDBPath = join(process.cwd(), "data/users.json")
    const billingCycleDBPath = join(process.cwd(), "data/data.json")
    let usersDB = []
    let billingCycleDB = []

    //Lendo os arquivos data.json e users.json ou retornando um erro em caso de falha
    try {
        usersDB = JSON.parse(await readFile(usersDBPath, { encoding: "utf-8" }))
        billingCycleDB = JSON.parse(await readFile(billingCycleDBPath, { encoding: "utf-8" }))
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }

    //Verificando se as senhas fornecidas no cadastro são iguais
    if (password !== confirmPassword) {
        return res.status(400).json({
            status: 400,
            message: "Error 400: bad request",
            errors: ["as senhas fornecidas não coincidem."]
        })
    }

    //Verificando se o email fornecido já possui cadastro no sistema
    if (usersDB.users[email.trim()]) {
        return res.status(409).json({
            status: 409,
            message: "Error 409: conflict",
            errors: ["o email fornecido já possui um cadastro em nosso sistema."]
        })
    }

    const newUser = { username, email }

    //Criando o hash da senha do usuário ou enviando um erro em caso de falha
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

    usersDB.users[email] = newUser
    billingCycleDB.data[email] = { username, email, billings: [] }

    //Atualizando os dados em data.json e users.json e retornando uma resposta ao client
    try {
        await writeFile(usersDBPath, JSON.stringify(usersDB), { encoding: "utf-8" })
        await writeFile(billingCycleDBPath, JSON.stringify(billingCycleDB), {
            encoding: "utf-8"
        })
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
