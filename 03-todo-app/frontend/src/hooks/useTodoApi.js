import { useCallback, useRef, useState } from "react"

export default function useTodoApi() {
    const [error, setError] = useState(false)
    const isSending = useRef(false)

    //Adicionando uma nova tarefa
    async function post(taskDescription, callback = () => {}) {
        if (isSending.current) return
        isSending.current = true

        return fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ taskDescription }),
            headers: { "Content-Type": "application/json" }
        })
            .then(async (response) => {
                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.message)
                }
                isSending.current = false
                callback()
            })
            .catch((error) => {
                isSending.current = false
                console.log(error)
            })
    }

    //Excluindo uma tarefa da lista
    async function remove(taskId, callback = () => {}) {
        return fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
            method: "DELETE",
            credentials: "include"
        })
            .then(async (response) => {
                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.message)
                }
                callback()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //Marcando uma tarefa como concluída ou pendente
    async function put({ taskId, isDone }, callback = () => {}) {
        return fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
            credentials: "include",
            method: "PUT",
            body: JSON.stringify({ done: isDone }),
            headers: { "Content-Type": "application/json" }
        })
            .then(async (response) => {
                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.message)
                }
                callback()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //Buscando e retornando a lista de tarefas mais recente
    const get = useCallback(async (description = "") => {
        const searchParams = `?description=${description}`
        return fetch(`${import.meta.env.VITE_API_URL}/tasks${searchParams}`, {
            credentials: "include"
        })
            .then(async (response) => {
                const data = await response.json()
                if (!response.ok) throw new Error(data.message)
                setError(false)
                return data
            })
            .catch((error) => {
                setError(true)
                console.log(error)
            })
    }, [])

    return {
        error,
        get,
        post,
        put,
        remove
    }
}
