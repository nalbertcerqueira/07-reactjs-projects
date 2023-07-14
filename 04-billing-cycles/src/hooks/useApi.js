import { useState } from "react"
import { toastEmmitter } from "../utils/client"
import { baseApiUrl, defaultFailMessage } from "../utils/constants"

//Hook utilizado para expor o acesso à CRUD de ciclo de pagamentos
export default function useApi(setter) {
    const [isSending, setIsSending] = useState(false)

    //Funções utilizadas na CRUD de ciclo de pagamentos
    async function submit(method, data, messages) {
        const toastId = Math.floor(Math.random() * 1000)
        const id = data._id || ""
        const msg = messages?.success || "Operação realizada com sucesso!"

        return fetch(`${baseApiUrl}/api/billing-cycles${id ? "/" + id : ""}`, {
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
    async function requestAndUpdate(data, method, successMsg) {
        if (isSending) return
        setIsSending(() => true)
        await submit(method, data, { success: successMsg })
        await get()
        setIsSending(() => false)
    }

    //Métodos da CRUD de ciclo de pagamentos
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
        await requestAndUpdate(data, "POST", "Dados cadastrados com sucesso!")
    }
    async function put(data) {
        await requestAndUpdate(data, "PUT", "Dados alterados com sucesso!")
    }
    async function deletee(data) {
        await requestAndUpdate(data, "DELETE", "Ciclo de pagamentos removido com sucesso!")
    }

    return { isSending, apiMethods: { get, post, put, deletee } }
}
