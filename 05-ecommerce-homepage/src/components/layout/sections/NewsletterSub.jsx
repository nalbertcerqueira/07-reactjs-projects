import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

//Componente utilizado em App.jsx
export default function Newsletter() {
    //Quinta sessão (assinatura de newsletter) de <main></main>
    return (
        <section className="newsletter">
            <div className="newsletter__inner">
                <h2 className="newsletter__title">Assine a nossa NEWSLETTER</h2>
                <form action="" className="newsletter__form">
                    <input
                        className="input input--half newsletter__input"
                        placeholder="Digite o seu e-mail"
                        name="user-email"
                        type="email"
                    />
                    <input
                        className="btn btn--half"
                        name="subscribe"
                        type="button"
                        value="Assinar"
                    />
                </form>
                <div className="newsletter__social-links">
                    <a href="#" role="button" className="newsletter__social-link">
                        <FontAwesomeIcon
                            className="newsletter__social-icon"
                            icon={["fab", "facebook-f"]}
                        />
                    </a>
                    <a href="#" role="button" className="newsletter__social-link">
                        <FontAwesomeIcon
                            className="newsletter__social-icon"
                            icon={["fab", "instagram"]}
                        />
                    </a>
                    <a href="#" role="button" className="newsletter__social-link">
                        <FontAwesomeIcon
                            className="newsletter__social-icon"
                            icon={["fab", "twitter"]}
                        />
                    </a>
                    <a href="#" role="button" className="newsletter__social-link">
                        <FontAwesomeIcon
                            className="newsletter__social-icon"
                            icon={["fab", "pinterest-p"]}
                        />
                    </a>
                </div>
            </div>
        </section>
    )
}
