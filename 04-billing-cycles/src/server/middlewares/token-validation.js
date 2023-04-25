import { readFile } from "fs/promises"
import jwt from "jsonwebtoken"
import { join } from "path"
import { cookieParser } from "../utils/api"

//Middleware utilizado para validar se o token presente enviado pelo usuário
//é válido ou não
export async function jwtValidation(req) {
    const prettyCookies = cookieParser(req.headers.cookie)
    const usersDBPath = join(process.cwd(), "data/users.json")
    let usersDB

    //Caso não exista um session_id cookie, a solicitação é finalizada
    if (!prettyCookies || !prettyCookies?.session_id) {
        const error = new Error("missing token/cookie in request")
        return {
            status: 400,
            message: "Error 400: bad request",
            errors: [{ msg: error.message }]
        }
    }

    //Validando se o token JWT enviado pelo usuário é um token válido
    const sessionId = prettyCookies.session_id
    try {
        jwt.verify(sessionId, process.env.AUTH_SECRET)
    } catch (error) {
        return {
            status: 498,
            message: "Error 498: invalid token, authentication failed",
            errors: [{ msg: error.message }]
        }
    }

    //Após validar o JWT, são retirados dele o username e email do usuário
    const { username, email } = jwt.decode(sessionId)

    try {
        usersDB = JSON.parse(await readFile(usersDBPath, { encoding: "utf-8" }))
    } catch (error) {
        return {
            status: 500,
            message: "Error 500: server internal error",
            errors: [{ msg: error.message }]
        }
    }

    //Verificando se o email fornecido pelo JWT realmente existe na DB
    const foundUser = usersDB.users[email]
    if (!foundUser) {
        return {
            status: 404,
            message: "Error 404: user not found",
            errors: [{ msg: "user provided in JWT was not found" }]
        }
    }

    return { status: 200, message: "Token validated with success!", username, email }
}

//Validando o cookie/JWT enviado pelo usuário para as rotas PROTEGIDAS
export async function jwtValidationProtectedRoute(req, res, handler) {
    try {
        const response = await jwtValidation(req)
        if (response.status < 400) return handler(req, res)
        else throw new Error(JSON.stringify(response))
    } catch (error) {
        const errorObject = JSON.parse(error.message)
        return res.status(errorObject.status).json(errorObject)
    }
}
