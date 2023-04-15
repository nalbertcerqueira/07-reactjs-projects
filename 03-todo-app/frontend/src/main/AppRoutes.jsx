import React from "react"
import { Route, Routes as Router } from "react-router-dom"

import ErrorMsg from "../components/Error.jsx"
import About from "../pages/About.jsx"
import Todo from "../pages/Todo.jsx"
//Roteador utilizado em App.jsx
export default function Routes() {
    return (
        <Router>
            <Route element={<Todo />} path="/" />
            <Route element={<Todo />} path="/todo" />
            <Route element={<About />} path="/about" />
            <Route
                element={
                    <ErrorMsg
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
