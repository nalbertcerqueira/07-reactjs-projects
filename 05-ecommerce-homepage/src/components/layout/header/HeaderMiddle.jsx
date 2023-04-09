import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext } from "react"
import { Context as MenuContext } from "../../../contexts/MenuContext"

//Componente utilizado em App.jsx
export default function HeaderMiddle() {
    //Utilizando o contexto para criar o menu toggle no modo mobile
    const { toggleMenuState } = useContext(MenuContext)

    //Desabilitando o envio do formulário
    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <div className="header-middle">
            <div className="header-middle__inner">
                <a className="header-middle__brand" href="#">
                    Electrum
                    <FontAwesomeIcon
                        className="header-middle__brand-icon"
                        icon={["fas", "bolt-lightning"]}
                    />
                </a>
                <form onSubmit={handleSubmit} className="header-middle__form-search">
                    <input
                        className="input input--half"
                        placeholder="Busque aqui"
                        name="product-name"
                        type="text"
                    />
                    <input
                        className="btn btn--half"
                        name="submit"
                        type="submit"
                        value="Pesquisar"
                    />
                </form>
                <div className="header-middle__cart-container">
                    <a className="header-middle__link" href="#">
                        <FontAwesomeIcon icon={["far", "heart"]} />
                        Favoritos
                        <span className="header-middle__counter">8</span>
                    </a>
                    <a className="header-middle__link" href="#">
                        <FontAwesomeIcon icon={["fas", "cart-shopping"]} />
                        Carrinho
                        <span className="header-middle__counter">0</span>
                    </a>
                </div>

                <button
                    onClick={toggleMenuState}
                    type="button"
                    className="btn btn--toggle header-middle__btn-toggle"
                >
                    <FontAwesomeIcon icon={["fas", "bars"]} />
                </button>
            </div>
        </div>
    )
}
