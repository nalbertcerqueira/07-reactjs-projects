import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext } from "react"
import { Context as MenuContext } from "../../../contexts/MenuContext"

//Componente utilizado em App.jsx
export default function HeaderBottom() {
    //Utilizando o contexto para criar o menu toggle no modo mobile
    const { isOpen, toggleMenuState } = useContext(MenuContext)
    const navLinks = [
        "Home",
        "Promoções",
        "Notebooks",
        "Celulares",
        "Câmeras",
        "Acessórios"
    ]

    return (
        <div className={`header-bottom ${isOpen ? "header-bottom--visible" : ""}`}>
            <div className="header-bottom__inner">
                <nav
                    className={`header-bottom__navbar ${
                        isOpen ? "header-bottom__navbar--open" : ""
                    }`}
                >
                    <ul className="header-bottom__link-list">
                        {navLinks.map((linkName) => (
                            <li key={linkName}>
                                <a className="header-bottom__navlink" href="#">
                                    {linkName}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={toggleMenuState}
                        type="button"
                        className="btn btn--toggle header-bottom__btn-toggle"
                    >
                        <FontAwesomeIcon icon={["fas", "xmark"]} />
                    </button>
                </nav>
            </div>
        </div>
    )
}
