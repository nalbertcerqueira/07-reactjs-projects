import { mongoClient } from "@/configs/db-config"
import { decodeJwt } from "jose"

/* Rotas protegidas por JWT */
export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return handleGET(req, res)
        default:
            return res.status(405).json({ status: 405, message: "Error 405: method not allowed" })
    }
}

//Enviando o consolidado de créditos e débitos do usuário
async function handleGET(req, res) {
    await mongoClient.connect()

    const { sort_by, value } = req.query
    const { session_id } = req.cookies
    const { id: userId } = decodeJwt(session_id)
    const billingCycleCollection = mongoClient.db.collection("billing-cycles")

    //Pipeline para obtenção do somatório de créditos e somatório de débitos
    //de um usuário.
    const pipeline = [
        {
            $match:
                sort_by && value
                    ? { userId: userId, [sort_by]: parseInt(value) }
                    : { userId: userId }
        },
        {
            $project: {
                credits: { $sum: "$credits.value" },
                debts: { $sum: "$debts.value" },
                _id: 0
            }
        },
        {
            $group: {
                _id: {},
                credits: { $sum: "$credits" },
                debts: { $sum: "$debts" }
            }
        },
        {
            $project: { _id: 0 }
        }
    ]

    try {
        const result = await billingCycleCollection.aggregate(pipeline).toArray()
        const summary = { credits: result[0]?.credits || 0, debts: result[0]?.debts || 0 }
        return res.status(200).json({ summary })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }
}
