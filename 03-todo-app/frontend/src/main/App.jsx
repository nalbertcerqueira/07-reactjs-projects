import React from "react"
import { BrowserRouter } from "react-router-dom"
import TodoContext from "../contexts/TodoContext.jsx"

import Menu from "../components/Menu.jsx"
import Routes from "./AppRoutes.jsx"

export default function App() {
    return (
        <TodoContext>
            <main className="app-container">
                <BrowserRouter>
                    <Menu />
                    <Routes />
                </BrowserRouter>
            </main>
        </TodoContext>
    )
}
