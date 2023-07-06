import { localeConfig } from "@/configs/yup-config"
import { array, number, object, setLocale, string } from "yup"

setLocale(localeConfig)

//Schema de validação de um ciclo de pagamentos usado nas rotas
//POST e PUT: /api/billing-cycles
const creditYupSchema = object({
    id: string().optional(),
    name: string().min(4).required(),
    value: number().min(0).required()
})
    .strict()
    .defined()
    .nonNullable("nao pode ser null")
    .noUnknown("apenas os campos name e value são permitidos em um crédito.")

const debtYupSchema = object({
    id: string().optional(),
    name: string().min(4).required(),
    value: number().min(0).required(),
    status: string().required().oneOf(["PAGO", "PENDENTE", "AGENDADO"])
})
    .strict()
    .defined()
    .noUnknown("apenas os campos name, value e status, são permitidos em um débito.")

export const billingCycleYupSchema = object({
    id: string().optional(),
    name: string().min(4).required(),
    month: number().min(0).max(12).required(),
    year: number().min(1970).max(2100).required(),
    credits: array(creditYupSchema.nonNullable("${path} nao pode ser null.")).required().min(1),
    debts: array(debtYupSchema.nonNullable("${path} nao pode ser null.")).required().min(1)
})
    .strict()
    .noUnknown(
        "apenas os campos name, month, year, credits e debts são permitidos no ciclo de pagamentos."
    )
