import { mongoClient } from "@/configs/db-config"
import { decodeJwt } from "jose"

/* Rotas protegidas por JWT */
export default function handler(req, res) {
    if (req.method === "GET") {
        return handleGET(req, res)
    }
    return res.status(405).send({ status: 405, message: "Error 405: method not allowed" })
}

//Obtendo o total de ciclos de pagamentos do usuário
async function handleGET(req, res) {
    await mongoClient.connect()

    const { session_id } = req.cookies
    const { id: userId } = decodeJwt(session_id)
    const billingCycleCollection = mongoClient.db.collection("billingCycles")

    try {
        const count = await billingCycleCollection.countDocuments({ userId: userId })
        return res.status(200).json({ billingCount: count })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }
}
