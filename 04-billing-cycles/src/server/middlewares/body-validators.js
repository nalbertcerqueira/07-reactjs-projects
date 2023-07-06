// import { NextApiRequest } from "next"
import { billingCycleYupSchema } from "../schemas/yup/billing-cycle"
import { userLoginSchema, userSignupSchema } from "../schemas/yup/user"

//Validando o corpo de requisição para adições (POST) ou alterações (PUT)
//de ciclos de pagamentos
export async function validateBillingCycle(req, res, handler) {
    try {
        await billingCycleYupSchema.validate(req.body, { abortEarly: false })
        return handler(req, res)
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Error 400: bad request",
            errors: error.errors
        })
    }
}

//Validando o corpo de requisição durante o login ou registro do usuário
export async function validateSigninSignup(req, res, handler) {
    const pathname = req.url

    try {
        if (pathname.match(/\/api\/login/)) {
            await userLoginSchema.validate(req.body, { abortEarly: false })
            return handler(req, res)
        }

        await userSignupSchema.validate(req.body, { abortEarly: false })
        return handler(req, res)
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Error 400: bad request",
            errors: error.errors
        })
    }
}
