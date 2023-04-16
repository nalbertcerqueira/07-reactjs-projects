import React from "react"
import { BrowserRouter } from "react-router-dom"

import Menu from "../components/Menu.jsx"
import TodoProvider from "../contexts/TodoContext.jsx"
import Routes from "./AppRoutes.jsx"

export default function App() {
    return (
        <TodoProvider>
            <main className="app-container">
                <BrowserRouter>
                    <Menu />
                    <Routes />
                </BrowserRouter>
            </main>
        </TodoProvider>
    )
}
