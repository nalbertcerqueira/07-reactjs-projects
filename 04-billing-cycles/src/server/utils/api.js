import { SignJWT, jwtVerify } from "jose"

//Função responsável por gerar um ID para os ciclos de pagamento
export function generateHash(idLength) {
    const charactersList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let id = ""
    for (let i = 0; i < idLength; i++) {
        const random = Math.floor(Math.random() * charactersList.length)
        id = id.concat(charactersList[random])
    }
    return id
}

//Atribuindo um id a cada transação, sendo elas créditos ou débitos
export function setTransactionsIds(dataTransactions) {
    const data = JSON.parse(JSON.stringify(dataTransactions))

    for (const transaction of data) {
        if (transaction.id) continue

        let newId = generateHash(15)
        let isIdRepeated = data.find((transaction) => transaction.id === newId)

        while (isIdRepeated) {
            newId = generateHash(15)
            isIdRepeated = data.find((transaction) => transaction.id === newId)
        }
        transaction.id = newId
    }
    return data
}

//Gerador de JWTs
export async function generateJWT(payload, secret, duration) {
    const iat = Math.floor(Date.now() / 1000)
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(iat + duration)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret))
}

//Verificador de JWTs
export async function verifyJWT(jwt, secret) {
    return jwtVerify(jwt, new TextEncoder().encode(secret))
}
