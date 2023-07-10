import { mongoClient } from "@/configs/db-config"
import { decodeJwt } from "jose"
import { ObjectId } from "mongodb"

export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return handleGET(req, res)
        default:
            return res.status(405).send("Error 405: Method not allowed")
    }
}

//Rota para buscar os dados do usuário
async function handleGET(req, res) {
    await mongoClient.connect()

    const userCollection = mongoClient.db.collection("users")
    const { session_id } = req.cookies
    const { id } = decodeJwt(session_id)
    let _id

    //Validando o id do usuário no JWT
    try {
        _id = new ObjectId(id)
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Error 400: bad request",
            errors: [error.message]
        })
    }

    const foundUser = await userCollection.findOne({ _id })
    if (!foundUser) {
        return res.status(404).json({
            status: 404,
            message: "Error 404: user not found",
            errors: [`usuário com id: ${id} não foi encontrado.`]
        })
    }

    return res.status(200).json({ username: foundUser.username, email: foundUser.email })
}
