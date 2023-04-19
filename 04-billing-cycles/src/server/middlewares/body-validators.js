import { body, validationResult } from "express-validator"

//Validando o corpo de requisição para adições (POST) ou alterações (PUT)
//de ciclos de pagamentos
export async function validateBillingCycle(req, res, handler) {
    const billingScheme = ["id", "name", "month", "year", "credits", "debts"]
    const billingValidations = [
        body("name")
            .isString()
            .exists({ checkFalsy: true, checkNull: true })
            .isLength({ min: 4 }),
        body("month").isInt({ min: 1, max: 12 }).exists({ checkNull: true }).toInt(),
        body("year").isInt({ min: 1970, max: 2100 }).exists({ checkNull: true }).toInt(),
        body("debts").isArray().exists({ checkNull: true }).optional(),
        body("credits").isArray().exists({ checkNull: true }).optional()
    ]
    const creditValidations = [
        body("credits.*.name").isString().exists({ checkFalsy: true, checkNull: true }),
        body("credits.*.value").isFloat({ min: 0 }).exists({ checkNull: true }).toFloat()
    ]
    const debtValidations = [
        body("debts.*.name").isString().exists({ checkFalsy: true, checkNull: true }),
        body("debts.*.value").isFloat({ min: 0 }).exists({ checkNull: true }).toFloat(),
        body("debts.*.status")
            .isString()
            .exists({ checkNull: true })
            .isUppercase()
            .isIn(["PAGO", "PENDENTE", "AGENDADO"])
    ]
    const validations = [...billingValidations, ...debtValidations, ...creditValidations]

    await Promise.all(validations.map((validation) => validation.run(req)))
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res
            .status(400)
            .json({ status: 400, message: "Error 400: bad request", errors: result.errors })
    }

    for (let key of Object.keys(req.body)) {
        if (!billingScheme.includes(key)) {
            const error = new Error(`parameter ${key} doesn't match with the scheme`)
            return res.status(400).json({
                status: 400,
                message: "Error 400: bad request",
                errors: [{ msg: error.message }]
            })
        }
    }

    return await handler(req, res)
}

//Validando o corpo de requisição durante o login ou registro do usuário
export async function validateSigninSignup(req, res, handler) {
    const emailRegex = /\S+@\S+\.\S+/
    const loginScheme = ["username", "email", "password", "confirmPassword"]
    const validators = {
        "/api/signup": [
            body("username").isString().isLength({ min: 4 }),
            body("email").isString().matches(emailRegex).exists({ checkNull: true }),
            body("password").isString().isLength({ min: 6 }),
            body("confirmPassword").isString().isLength({ min: 6 })
        ],
        "/api/login": [
            body("email").isString().matches(emailRegex).exists({ checkNull: true }),
            body("password").isString().isLength({ min: 6 })
        ]
    }

    await Promise.all(validators[req.url].map((validation) => validation.run(req)))
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res
            .status(400)
            .json({ status: 400, message: "Error 400: bad request", errors: result.errors })
    }

    for (let key of Object.keys(req.body)) {
        if (!loginScheme.includes(key)) {
            const error = new Error(`parameter ${key} doesn't match with the scheme`)
            return res.status(400).json({
                status: 400,
                message: "Error 400: bad request",
                errors: [{ msg: error.message }]
            })
        }
    }

    return handler(req, res)
}
