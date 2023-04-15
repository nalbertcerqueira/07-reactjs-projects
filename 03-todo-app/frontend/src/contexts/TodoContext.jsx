import propTypes from "prop-types"
import React, { createContext, useEffect, useState } from "react"

export const Context = createContext(null)

//Contexto utilizado em App.jsx
export default function TodoContext({ children }) {
    const [todoList, setTodoList] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        let ignoreFetch = false
        async function updateTodoList() {
            const data = await fetchData()
            if (!ignoreFetch) {
                setTodoList(data)
            }
        }
        updateTodoList()

        return () => {
            ignoreFetch = true
        }
    }, [])

    //Buscando e retornando a lista de tarefas mais recente
    async function fetchData(description = "") {
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
    }

    //Atualizando o estado da lista de tarefas com o resultado de fetchData
    async function refreshTodo(description = "") {
        const data = await fetchData(description)
        setTodoList(data)
    }

    return (
        <Context.Provider value={{ todoList, error, refreshTodo }}>
            {children}
        </Context.Provider>
    )
}
TodoContext.propTypes = {
    children: propTypes.node
}
