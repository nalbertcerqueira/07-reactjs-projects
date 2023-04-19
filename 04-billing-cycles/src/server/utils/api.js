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

//"Parseando" os cookies da requisição, e retornando um objeto JS
export function cookieParser(rawCookies) {
    if (typeof rawCookies !== "string") return undefined
    const prettyCookies = rawCookies
        .replace(/ /g, "")
        .replace(/&/g, ";")
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce((acc, value) => {
            acc[value[0]] = value[1]
            return acc
        }, {})
    return prettyCookies
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
