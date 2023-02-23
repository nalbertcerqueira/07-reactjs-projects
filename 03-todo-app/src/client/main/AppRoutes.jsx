import React, { useState } from "react"
import { Route, Routes as Router } from "react-router-dom"

import Error from "../components/Error.jsx"
import About from "../pages/About.jsx"
import Todo from "../pages/Todo.jsx"

//Roteador utilizado em App.jsx

export default function Routes() {
    const [taskList, setTaskList] = useState(null)
    const [error, setError] = useState(false)

    //Função responsável por fazer a primeira busca de dados
    //como também, atulizar os dados da tabela para mantê-la sincronizada
    const refreshData = async function (description) {
        const search = description ? `?description=${description}` : ""
        try {
            const response = await fetch(`http://localhost:3000/api/tasks${search}`)
            const data = await response.json()
            if (response.status < 400) {
                setError(false)
                setTaskList(data)
            } else setError(true)
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    return (
        <Router>
            <Route
                element={<Todo data={taskList} fetcher={refreshData} error={error} />}
                path="/"
            />
            <Route
                element={<Todo data={taskList} fetcher={refreshData} error={error} />}
                path="/todo"
            />
            <Route element={<About />} path="/about" />
            <Route
                element={
                    <Error
                        className="animate-display"
                        status="404"
                        message="Sorry, content not found."
                    />
                }
                path="*"
            />
        </Router>
    )
}
