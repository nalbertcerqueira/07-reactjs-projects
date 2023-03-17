require("dotenv").config()
const { cookieParser, generateHash } = require("../utils/utils")
const { readFile, writeFile } = require("fs").promises
const { resolve } = require("path")

//Middleware responsável por verificar se o client já possui ou não um cookie.
module.exports.cookieHandler = async function (req, res, next) {
    const allowedMethods = ["GET", "POST", "PUT", "DELETE"]
    const filePath = resolve(process.cwd(), "./data/tasks.json")
    let data

    if (!allowedMethods.includes(req.method)) return next()

    //Caso exista um cookie, o middleware é finalizado, passando para o endpoint
    if (req.headers.cookie) {
        const prettyCookies = cookieParser(req.headers.cookie)
        if (prettyCookies?.user_id_todo) {
            return next()
        }
    }

    //Caso não exista, é nescessário ler o arquivo data.json para criar os dados
    //do novo usuário com um novo cookie gerado
    try {
        data = JSON.parse(await readFile(filePath, { encoding: "utf-8" }))
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }

    //Verificando se o cookie gerado já existe em data.json
    let newCookie = generateHash(15)
    while (data[newCookie]) {
        newCookie = generateHash(15)
    }

    data[newCookie] = { user: newCookie, tasks: [] }

    //Adicionando o cookie na resposta da requisição http
    res.cookie("user_id_todo", newCookie, {
        httpOnly: true,
        maxAge: 31536000000,
        domain: process.env.COOKIE_DOMAIN
    })

    //reescrevendo o arquivo data.json e redirecionando o client para o endpoint/url
    //que foi solicitado na requisição
    try {
        await writeFile(filePath, JSON.stringify(data), { encoding: "utf-8" })
        return res.redirect(req.url)
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }
}
//Middlware responsável por habilitar o CORS
module.exports.enableCORS = function () {
    return (req, res, next) => {
        res.setHeader("Access-Control-Allow-Credentials", "true")
        res.setHeader("Access-Control-Allow-Origin", `${process.env.ALLOWED_ORIGINS}`)
        return next()
    }
}
