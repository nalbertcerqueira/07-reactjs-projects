import React from "react"
import { BrowserRouter } from "react-router-dom"

import Menu from "../components/Menu.jsx"
import Routes from "./AppRoutes.jsx"

//Componente principal
export default function App() {
    return (
        <main className="px-0 sm:px-12 min-w-360 max-w-7xl m-auto">
            <BrowserRouter>
                <Menu />
                <Routes />
            </BrowserRouter>
        </main>
    )
}
