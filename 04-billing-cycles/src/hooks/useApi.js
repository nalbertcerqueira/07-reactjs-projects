import { useState } from "react"
import { gatherErrors, toastEmmitter } from "../utils/client"
import { baseApiUrl, defaultFailMessage } from "../utils/constants"
import useAuth from "./useAuth"

//Hook utilizado para expor o acesso à CRUD de ciclo de pagamentos
export default function useApi(setter) {
    const { methods: authMethods } = useAuth()
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
            .then(async (res) => {
                const data = await res.json()
                if (res.status === 401) {
                    setTimeout(async () => {
                        await authMethods.logout()
                        location.reload()
                    }, 2000)
                    throw new Error(defaultFailMessage)
                }

                if (!res.ok) {
                    const errorMessage = gatherErrors(data.errors)
                    throw new Error(errorMessage)
                }

                toastEmmitter({ message: msg, success: true, id: toastId })
            })
            .catch((error) => {
                console.log(error.message)
                toastEmmitter({
                    message: messages?.fail || error.message,
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
            .then(async (res) => {
                const data = await res.json()
                if (!res.ok) {
                    const errorMessage = gatherErrors(data.errors)
                    throw new Error(errorMessage)
                }
                return setter(data)
            })
            .catch((error) => {
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
