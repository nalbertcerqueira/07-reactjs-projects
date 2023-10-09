import React from "react"
import Timer from "../../Timer"

//Componente utilizado em App.jsx
export default function Deal() {
    //Terceira sessão (promoção atual)
    return (
        <section className="deal">
            <div className="deal__inner-container">
                <Timer duration={7 * 24 * 3600 * 1000} />
                <h2 className="deal__title">promoção de fone gamer</h2>
                <p className="deal__promo-description">
                    toda a linha gamer com 50% de desconto
                </p>
                <a className="btn btn--cta" role="button" href="#">
                    COMPRAR AGORA
                </a>
            </div>
        </section>
    )
}
