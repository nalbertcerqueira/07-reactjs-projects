import { NextResponse } from "next/server"
import { billingCycleYupSchema } from "../schemas/yup/billing-cycle"
import { userLoginSchema, userSignupSchema } from "../schemas/yup/user"

//Validando o corpo de requisição para adições (POST) ou alterações (PUT)
//de ciclos de pagamentos
export async function validateBillingCycle(req, res, handler) {
    try {
        await billingCycleYupSchema.validate(await req.json(), { abortEarly: false })
        return handler ? await handler(req, res) : res
    } catch (error) {
        const errorResponse = {
            status: 400,
            message: "Error 400: bad request",
            errors: error.errors
        }
        return new NextResponse(JSON.stringify(errorResponse), { status: 400 })
    }
}

//Validando o corpo de requisição durante o login ou registro do usuário
export async function validateSigninSignup(req, res, handler) {
    const { pathname } = req.nextUrl

    try {
        if (pathname === "/api/login") {
            await userLoginSchema.validate(await req.json(), { abortEarly: false })
            return handler ? await handler(req, res) : res
        }

        await userSignupSchema.validate(await req.json(), { abortEarly: false })
        return handler ? await handler(req, res) : res
    } catch (error) {
        const errorResponse = {
            status: 400,
            message: "Error 400: bad request",
            errors: error.errors
        }
        return new NextResponse(JSON.stringify(errorResponse), { status: 400 })
    }
}
