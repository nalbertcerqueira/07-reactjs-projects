import { NextResponse } from "next/server"
import { paginationQuerySchema, summaryQuerySchema } from "../schemas/yup/search-params"

//Validando as queries para consulta do sumário
export async function validateSummaryQuery(req, res, handler) {
    const query = Object.fromEntries(req.nextUrl.searchParams.entries())
    try {
        await summaryQuerySchema.validate(query, { abortEarly: false })
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

//Validando as queries referentes à paginação
export async function validatePageQuery(req, res, handler) {
    const query = Object.fromEntries(req.nextUrl.searchParams.entries())
    try {
        await paginationQuerySchema.validate(query, { abortEarly: false })
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
