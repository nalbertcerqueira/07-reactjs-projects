import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

//Componente utilizado em App.jsx
export default function HeaderTop() {
    return (
        <div className="header-top">
            <div className="header-top__inner">
                <div className="header-top__info-wrapper">
                    <span className="header-top__info-item">
                        <FontAwesomeIcon
                            className="header-top__icon"
                            icon={["fas", "phone-flip"]}
                        />
                        (75) 99999-9999
                    </span>
                    <span className="header-top__info-item">electrum@email.com</span>
                    <span className="header-top__info-item">
                        <FontAwesomeIcon
                            className="header-top__icon"
                            icon={["fas", "location-dot"]}
                        />
                        Rua Teste, 1234
                    </span>
                </div>
                <div className="header-top__menu">
                    <a className="common-link" href="#">
                        <span className="common-link__content">BRL</span>
                    </a>
                    <a className="common-link" href="#">
                        <FontAwesomeIcon
                            className="common-link__icon"
                            icon={["fas", "user"]}
                        />
                        <span className="common-link__content">Minha Conta</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
