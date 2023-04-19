import { toastEmmitter } from "../utils/client"
import { baseApiUrl, defaultFailMessage } from "../utils/constants"

//Hook utilizado para espor o acesso à CRUD de ciclo de pagamentos
export default function useApi(setter) {
    //Função base utilizada nos métodos abaixo
    async function submit(method, data, messages) {
        const toastId = Math.floor(Math.random() * 1000)
        const id = data.id || ""
        const msg = messages?.success || "Operação realizada com sucesso!"

        return fetch(`${baseApiUrl}/api/billing-cycles/${id}`, {
            method,
            body: JSON.stringify(data || {}),
            headers: { "Content-Type": "application/json" }
        })
            .then(async (response) => {
                const data = await response.json()
                if (!response.ok) throw new Error(JSON.stringify(data))
                else toastEmmitter({ message: msg, success: true, id: toastId })
            })
            .catch((error) => {
                console.log(error)
                console.log(error.message)
                toastEmmitter({
                    message: messages?.fail || defaultFailMessage,
                    id: toastId
                })
            })
    }
    //Métodos da CRUD
    async function get(page, limit) {
        const queryString = page && limit ? `?page=${page}&limit=${limit}` : ""
        const url = `${baseApiUrl}/api/billing-cycles${queryString}`

        return fetch(url)
            .then(async (response) => {
                const data = await response.json()
                if (!response.ok) throw new Error(data?.message || "Server internal error")
                return setter(data)
            })
            .catch((error) => {
                console.log(error)
                console.log(error.message)
            })
    }
    async function post(data) {
        await submit("POST", data, { success: "Dados cadastrados com sucesso!" })
        await get()
    }
    async function put(data) {
        await submit("PUT", data, { success: "Dados alterados com sucesso!" })
    }
    async function deletee(data) {
        await submit("DELETE", data, {
            success: "Ciclo de pagamentos removido com sucesso!"
        })
    }

    return { get, post, put, deletee }
}
