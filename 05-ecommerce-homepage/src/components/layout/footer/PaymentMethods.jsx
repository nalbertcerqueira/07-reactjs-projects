import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

//Componente utilizado em App.jsx
export default function PaymentMethods() {
    //Métodos de pagamentos aceitos pela plataforma
    return (
        <div className="footer__payment-methods">
            <div className="footer__payment-cards">
                <FontAwesomeIcon
                    className="footer__payment-icon"
                    icon={["fab", "cc-mastercard"]}
                />
                <FontAwesomeIcon
                    className="footer__payment-icon"
                    icon={["fab", "cc-visa"]}
                />
                <FontAwesomeIcon
                    className="footer__payment-icon"
                    icon={["fab", "cc-diners-club"]}
                />
                <FontAwesomeIcon
                    className="footer__payment-icon"
                    icon={["fab", "cc-amazon-pay"]}
                />
                <FontAwesomeIcon
                    className="footer__payment-icon"
                    icon={["fab", "cc-apple-pay"]}
                />
            </div>
        </div>
    )
}
