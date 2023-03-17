/* eslint-disable no-param-reassign */

//Função responsável por gerar um hash que pode ser utilizando como ID ou Cookie
function generateHash(idLength) {
    const charactersList =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let id = ""
    for (let i = 0; i < idLength; i++) {
        const random = Math.floor(Math.random() * charactersList.length)
        id = id.concat(charactersList[random])
    }
    return id
}

//"Parseando" os cookies da requisição, e retornando um objeto JS
function cookieParser(rawCookies) {
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

module.exports = { generateHash, cookieParser }
