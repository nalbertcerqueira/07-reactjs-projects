import React from "react"
import { Link, useLocation } from "react-router-dom"

import { CalendarIcon } from "./Icons.jsx"

//Componente Menu utilizado em App.jsx
export default function Menu() {
    const { pathname } = useLocation()
    const afterStyles =
        "after:w-full after:h-0.5 after:bg-gray-50 after:block after:absolute after:rounded-lg"
    return (
        <header className="menu-header">
            <nav className="flex gap-6 items-center">
                <Link
                    to="/"
                    className="whitespace-nowrap flex hover:text-gray-50
                    transition-all text-xl"
                >
                    <CalendarIcon className="mr-2 flex items-center" />
                    Todo App
                </Link>
                <Link
                    className={`link ${
                        (pathname === "/todo" || pathname === "/") && afterStyles
                    }`}
                    to="/todo"
                >
                    Tarefas
                </Link>
                <Link className={`link ${pathname === "/about" && afterStyles}`} to="/about">
                    Sobre
                </Link>
            </nav>
        </header>
    )
}
