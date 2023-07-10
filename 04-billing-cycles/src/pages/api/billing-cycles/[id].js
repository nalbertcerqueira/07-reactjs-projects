import { mongoClient } from "@/configs/db-config"
import { BillingCycle } from "@/src/server/schemas/db/billing-cycle"
import { decodeJwt } from "jose"
import { ObjectId } from "mongodb"

/* Rotas protegidas por JWT */
export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return handleGET(req, res)
        case "DELETE":
            return handleDELETE(req, res)
        case "PUT":
            return handlePUT(req, res)
        default:
            return res.status(405).send({ status: 405, message: "Error 405: method not allowed" })
    }
}

//Buscando um ciclo de pagamentos com base em seu ID
async function handleGET(req, res) {
    await mongoClient.connect()

    const { session_id } = req.cookies
    const { id: userId } = decodeJwt(session_id)
    const { id: billingCycleId } = req.query
    const billingCycleCollection = mongoClient.db.collection("billing-cycles")

    //Validando o id do ciclo de pagamentos
    try {
        new ObjectId(billingCycleId)
    } catch (error) {
        return res.status(404).json({
            status: 404,
            message: "Error 404: content not found",
            errors: [`ciclo de pagamento com id: ${billingCycleId} não foi encontrado.`]
        })
    }

    //Buscando o ciclo de pagamentos no banco de dados
    const query = { _id: new ObjectId(billingCycleId), userId: userId }
    const foundBilling = await billingCycleCollection.findOne(query)
    if (!foundBilling) {
        return res.status(404).json({
            status: 404,
            message: "Error 404: content not found",
            errors: [`ciclo de pagamento com id: ${billingCycleId} não foi encontrado.`]
        })
    }

    return res.status(200).json({ billing: foundBilling })
}

//Alterando os dados de um ciclo de pagamentos com base no ID
async function handlePUT(req, res) {
    await mongoClient.connect()

    const { session_id } = req.cookies
    const { id: userId } = decodeJwt(session_id)
    const { id: billingCycleId } = req.query
    const billingCycleCollection = mongoClient.db.collection("billing-cycles")

    //Validando o id do ciclo de pagamentos
    try {
        new ObjectId(billingCycleId)
    } catch (error) {
        return res.status(404).json({
            status: 404,
            message: "Error 404: content not found",
            errors: [`ciclo de pagamento com id: ${billingCycleId} não foi encontrado.`]
        })
    }

    //Buscando o ciclo de pagamento para fazer a atualização do dados
    const filter = { _id: new ObjectId(billingCycleId), userId: userId }
    const updateQuery = { $set: new BillingCycle({ userId: userId, ...req.body }) }
    try {
        const result = await billingCycleCollection.findOneAndUpdate(filter, updateQuery)
        if (!result.lastErrorObject.updatedExisting) {
            return res.status(404).json({
                status: 404,
                message: "Error 404: content no found",
                errors: [`ciclo de pagamento com id ${billingCycleId} não foi encontrado.`]
            })
        }
    } catch (error) {
        return res.status(404).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }

    return res
        .status(200)
        .json({ status: 200, message: "Ciclo de pagamento atualizado com sucesso!" })
}

//Removendo um ciclo de pagamentos através do ID informado
async function handleDELETE(req, res) {
    await mongoClient.connect()

    const { session_id } = req.cookies
    const { id: userId } = decodeJwt(session_id)
    const { id: billingCycleId } = req.query
    const billingCycleCollection = mongoClient.db.collection("billing-cycles")

    //Validando o id do ciclo de pagamentos
    try {
        new ObjectId(billingCycleId)
    } catch (error) {
        return res.status(404).json({
            status: 404,
            message: "Error 404: content not found",
            errors: [`ciclo de pagamento com id: ${billingCycleId} não foi encontrado.`]
        })
    }

    //Removendo o ciclo de pagamentos do banco de dados
    const query = { _id: new ObjectId(billingCycleId), userId: userId }
    try {
        const result = await billingCycleCollection.findOneAndDelete(query)
        if (!result.value) {
            return res.status(404).json({
                status: 404,
                message: "Error 404: content not found",
                errors: [`ciclo de pagamento com id: ${billingCycleId} não foi encontrado.`]
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error 500: server internal error",
            errors: [error.message]
        })
    }

    return res
        .status(200)
        .json({ status: 200, message: "Ciclo de pagamento removido com sucesso!" })
}
