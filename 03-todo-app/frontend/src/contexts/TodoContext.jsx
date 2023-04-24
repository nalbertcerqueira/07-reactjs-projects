import propTypes from "prop-types"
import React, { createContext, useEffect, useState } from "react"
import useTodoApi from "../hooks/useTodoApi"

export const TodoContext = createContext(null)

//Contexto utilizado em App.jsx
export default function TodoProvider({ children }) {
    const { error, get } = useTodoApi()
    const [todoList, setTodoList] = useState(null)

    useEffect(() => {
        let ignoreFetch = false
        async function updateTodoList() {
            const data = await get()
            if (!ignoreFetch) setTodoList(data)
        }
        updateTodoList()

        return () => (ignoreFetch = true)
    }, [get])

    return (
        <TodoContext.Provider value={{ todoList, error, setTodoList }}>
            {children}
        </TodoContext.Provider>
    )
}
TodoProvider.propTypes = {
    children: propTypes.node
}
