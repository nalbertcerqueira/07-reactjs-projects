import { useState } from "react"
import { toastEmmitter } from "../utils/client"
import { baseApiUrl, defaultFailMessage } from "../utils/constants"

//Hook utilizado para expor o acesso à CRUD de ciclo de pagamentos
export default function useApi(setter) {
    const [isSending, setIsSending] = useState(false)

    //Função base utilizada nos métodos abaixo
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
        if (isSending) return
        setIsSending(() => true)
        await submit("POST", data, { success: "Dados cadastrados com sucesso!" })
        await get()
        setIsSending(() => false)
    }
    async function put(data) {
        if (isSending) return
        setIsSending(() => true)
        await submit("PUT", data, { success: "Dados alterados com sucesso!" })
        setIsSending(() => false)
    }
    async function deletee(data) {
        if (isSending) return
        setIsSending(() => true)
        await submit("DELETE", data, {
            success: "Ciclo de pagamentos removido com sucesso!"
        })
        setIsSending(() => false)
    }

    return { isSending, apiMethods: { get, post, put, deletee } }
}
