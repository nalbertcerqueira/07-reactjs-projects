import { query, validationResult } from "express-validator"

//Validando as queries para consulta do sumuário
export async function validateSummaryQuery(req, res, handler) {
    const validations = [
        query("sort_by").isIn(["year", "month"]).optional(),
        query("value").isInt().toInt().optional()
    ]

    await Promise.all(validations.map((validation) => validation.run(req)))
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res.status(500).json({
            status: 500,
            message: "Error 400: bad request",
            errors: result.errors
        })
    } else {
        return handler(req, res)
    }
}

//Validando as queries referentes à paginação
export async function validatePaginationQuery(req, res, handler) {
    const validations = [
        query("page").isInt().toInt().optional(),
        query("limit").isInt({ min: 2, max: 10 }).toInt().optional()
    ]

    await Promise.all(validations.map((validation) => validation.run(req)))
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res
            .status(400)
            .json({ status: 400, message: "Error 400: bad request", errors: result.errors })
    } else {
        return handler(req, res)
    }
}
