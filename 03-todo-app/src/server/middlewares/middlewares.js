const { cookieParser, generateHash } = require("../utils/utils")
const { readFile, writeFile } = require("fs").promises
const { resolve } = require("path")

//Middleware responsável por verificar se o client já possui ou não um cookie.
module.exports.cookieHandler = async function (req, res, next) {
    //Caso exista um cookie, o middleware é finalizado, pulando para o endpoint
    const prettyCookies = cookieParser(req.headers.cookie)
    if (prettyCookies.user_id_todo) {
        return next()
    }

    //Caso não exista, é nescessário ler o arquivo data.json para criar os dados
    //do novo usuário com um novo cookie gerado
    const filePath = resolve(__dirname, "../data/tasks.json")
    let usersData
    try {
        const response = await readFile(filePath, { encoding: "utf-8" })
        usersData = JSON.parse(response)
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }

    //Verificando se o cookie gerado já existe em data.json
    let newCookie = generateHash(7)
    let isCookieRepeated = usersData.find((user) => user.cookie === newCookie)
    while (isCookieRepeated) {
        newCookie = generateHash(7)
        isCookieRepeated = usersData.find((user) => user.cookie === newCookie)
    }

    usersData.push({ cookie: newCookie, tasks: [] })

    //Adicionando o cookie na resposta da requisição http
    res.cookie("user_id_todo", newCookie, {
        httpOnly: true,
        maxAge: 331536000000,
        sameSite: "strict"
    })

    //reescrevendo o arquivo data.json e redirecionando o client para o endpoint/url
    //que foi solicitado na requisição
    try {
        await writeFile(filePath, JSON.stringify(usersData, null, 4), { encoding: "utf-8" })
        return res.redirect(req.url)
    } catch (error) {
        return res
            .status(500)
            .json({ status: 500, message: "Error 500: Server internal error" })
    }
}
