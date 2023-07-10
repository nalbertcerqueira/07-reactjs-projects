import { NextResponse } from "next/server"
import { verifyJWT } from "../utils/api"

//Middleware utilizado para validar se o token enviado pelo usuário
//é válido ou não
export async function validateToken(req, res, handler) {
    const sessionId = req.cookies.get("session_id")?.value

    //Caso não exista um session_id cookie, a solicitação é finalizada
    if (!sessionId) {
        const errorResponse = {
            status: 401,
            message: "Error 401: Unauthorized, token is missing",
            errors: ["é necessário o uso de um token para acessar este conteúdo."]
        }
        return new NextResponse(JSON.stringify(errorResponse), { status: 401 })
    }

    //Validando se o token JWT enviado pelo usuário é um token válido
    try {
        await verifyJWT(sessionId, process.env.AUTH_SECRET)
    } catch (error) {
        const errorResponse = {
            status: 498,
            message: "Error 498: invalid token, authentication failed",
            errors: ["token inválido. Forneça um novo token para acessar este conteúdo."]
        }
        return new NextResponse(JSON.stringify(errorResponse), { status: 498 })
    }

    return handler ? handler(req, res) : res
}

//Validando o cookie/JWT enviado pelo usuário para as rotas protegidas
export async function authenticateAndRedirect(req, res) {
    const pathname = req.nextUrl.pathname
    const authRoutes = ["/login", "/signup"]
    const protectedRoutes = ["/", "/billing-cycle"]
    const tokenResponse = await validateToken(req, res)

    if (tokenResponse.ok && authRoutes.includes(pathname)) {
        const appUrl = new URL("/", req.url)
        return NextResponse.redirect(appUrl)
    }

    if (!tokenResponse.ok && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return res
}
