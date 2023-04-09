import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext } from "react"
import { Context as MenuContext } from "../../../contexts/MenuContext"

//Componente utilizado em App.jsx
export default function HeaderBottom() {
    //Utilizando o contexto para criar o menu toggle no modo mobile
    const { isOpen, toggleMenuState } = useContext(MenuContext)

    return (
        <div className={`header-bottom ${isOpen ? "is-visible" : ""}`}>
            <div className="header-bottom__inner">
                <nav className={`header-bottom__navbar ${isOpen ? "navbar-shown" : ""}`}>
                    <ul className="header-bottom__link-list">
                        <li>
                            <a className="header-bottom__navlink" href="#">
                                Home
                            </a>
                        </li>
                        <li>
                            <a className="header-bottom__navlink" href="#">
                                Promoções
                            </a>
                        </li>
                        <li>
                            <a className="header-bottom__navlink" href="#">
                                Notebooks
                            </a>
                        </li>
                        <li>
                            <a className="header-bottom__navlink" href="#">
                                Celulares
                            </a>
                        </li>
                        <li>
                            <a className="header-bottom__navlink" href="#">
                                Câmeras
                            </a>
                        </li>
                        <li>
                            <a className="header-bottom__navlink" href="#">
                                Acessórios
                            </a>
                        </li>
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
