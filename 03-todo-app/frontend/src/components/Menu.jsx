import React from "react"
import { Link, useLocation } from "react-router-dom"

import { CalendarIcon } from "./Icons.jsx"

//Componente Menu utilizado em App.jsx
export default function Menu() {
    const { pathname } = useLocation()
    const linkSelected = "header__nav-link--selected"
    return (
        <header className="header">
            <nav className="header__navbar">
                <Link to="/" className="header__brand-link">
                    <CalendarIcon className="header__brand-icon" />
                    Todo App
                </Link>
                <Link
                    className={`header__nav-link ${
                        pathname === "/todo" || pathname === "/" ? linkSelected : ""
                    }`}
                    to="/todo"
                >
                    Tarefas
                </Link>
                <Link
                    className={`header__nav-link ${
                        pathname === "/about" ? linkSelected : ""
                    }`}
                    to="/about"
                >
                    Sobre
                </Link>
            </nav>
        </header>
    )
}
