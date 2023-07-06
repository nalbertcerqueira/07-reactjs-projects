import { localeConfig } from "@/configs/yup-config"
import { number, object, setLocale, string } from "yup"

setLocale(localeConfig)

//Schema de validação dos parâmetros de páginação utilizado na
//rota GET /api/billing-cycles
export const paginationQuerySchema = object({
    page: number().min(1).optional(),
    limit: number().min(2).max(10).optional()
}).noUnknown("apenas os campos page e limit são permitidos durante a paginação.")

//Schema de validação dos parâmetros usados para gerar o sumário
//de ciclo de pagamentos em GET: /api/billing-cycles/summary
export const summaryQuerySchema = object({
    sort_by: string().oneOf(["month", "year"]).optional(),
    value: number().min(0).optional()
}).noUnknown("apenas os campos sort_by e value são permitidos na filtragem do sumário.")
