import { NextResponse } from "next/server"
import { validateBillingCycle, validateSigninSignup } from "./server/middlewares/body-validators"
import { validatePageQuery, validateSummaryQuery } from "./server/middlewares/query-validators"
import { authenticateAndRedirect, validateToken } from "./server/middlewares/token-validation"

export default async function mainMiddleware(req) {
    const res = NextResponse.next()
    const { pathname } = req.nextUrl
    const { method } = req

    switch (true) {
        //Rotas do ciclo de pagamentos (API)
        case pathname === "/api/billing-cycles" && method === "GET":
            return await validateToken(req, res, validatePageQuery)

        case pathname === "/api/billing-cycles" && method === "POST":
            return await validateToken(req, res, validateBillingCycle)

        case pathname === "/api/billing-cycles/summary" && method === "GET":
            return await validateToken(req, res, validateSummaryQuery)

        case pathname === "/api/billing-cycles/total" && method === "GET":
            return await validateToken(req, res)

        case pathname.startsWith("/api/billing-cycles") && ["GET", "DELETE"].includes(method):
            return await validateToken(req, res)

        case pathname.startsWith("/api/billing-cycles") && method === "PUT":
            return await validateToken(req, res, validateBillingCycle)

        //Rotas de login e cadastro (API)
        case ["/api/login", "/api/signup"].includes(pathname) && method === "POST":
            return await validateSigninSignup(req, res)

        case pathname === "/api/users" && method === "GET":
            return await validateToken(req, res)

        //Rotas de navegação (Client)
        case ["/", "/login", "/signup", "/billing-cycle"].includes(pathname) && method === "GET":
            return await authenticateAndRedirect(req, res)

        default:
            return res
    }
}

export const config = {
    matcher: [
        "/api/billing-cycles/:path*",
        "/api/login",
        "/api/signup",
        "/api/users",
        "/",
        "/login",
        "/signup",
        "/billing-cycle"
    ]
}
