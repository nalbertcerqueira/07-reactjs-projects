import { mongoClient } from "@/configs/db-config"
import { BillingCycle } from "@/src/server/schemas/db/billing-cycle"
import { decodeJwt } from "jose"

/* Rotas protegidas por JWT */
export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return handleGET(req, res)
        case "POST":
            return handlePOST(req, res)
        default:
            return res.status(405).send({ status: 405, message: "Error 405: method not allowed" })
    }
}

//Adicionando um novo ciclo de pagamentos
async function handlePOST(req, res) {
    await mongoClient.connect()

    const { session_id } = req.cookies
    const { id } = decodeJwt(session_id)
    const billingCycleCollection = mongoClient.db.collection("billingCycles")
    const newBillingCycle = new BillingCycle({ userId: id, ...req.body })

    try {
        const { acknowledged } = await billingCycleCollection.insertOne(newBillingCycle)
        if (acknowledged) {
            return res
                .status(200)
                .json({ status: 200, message: "Ciclo de pagamento cadastrado com sucesso!" })
        } else {
            throw new Error("não foi possível atualizar o banco de dados.")
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }
}

//Enviando todos os ciclos de pagamentos do usuário
async function handleGET(req, res) {
    await mongoClient.connect()

    const { page, limit } = req.query
    const { session_id } = req.cookies
    const { id } = decodeJwt(session_id)
    const billingCycleCollection = mongoClient.db.collection("billingCycles")

    //Determinando o índice inicial e final para filtrar os dados
    //com base na paginação
    const beginIndex = page && limit ? (page - 1) * limit : 0
    const docLimit = parseInt(limit) || 1000000

    //Pipeline para buscar os dados e ordená-los do mais recente ao mais antigo com
    //base em seu mês e ano.
    const pipeline = [
        { $match: { userId: id } },
        { $sort: { year: -1, month: -1 } },
        { $skip: beginIndex },
        { $limit: docLimit }
    ]

    try {
        const billings = await billingCycleCollection.aggregate(pipeline).toArray()
        return res.status(200).json(billings)
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }
}
