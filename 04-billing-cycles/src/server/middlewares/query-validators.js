import { paginationQuerySchema, summaryQuerySchema } from "../schemas/yup/search-params"

//Validando as queries para consulta do sumário
export async function validateSummaryQuery(req, res, handler) {
    console.log(req.query)
    try {
        await summaryQuerySchema.validate(req.query, { abortEarly: false })
        return handler(req, res)
    } catch (error) {
        return res.json({
            status: 400,
            message: "Error 400: bad request",
            errors: error.errors
        })
    }
}

//Validando as queries referentes à paginação
export async function validatePaginationQuery(req, res, handler) {
    console.log(req.query)
    try {
        await paginationQuerySchema.validate(req.query, { abortEarly: false })
        return handler(req, res)
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Error 400: bad request",
            errors: error.errors
        })
    }
}
