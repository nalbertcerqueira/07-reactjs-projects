import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import FooterLinks from "../../FooterLinks"

//Componente utilizado em App.jsx
export default function Content() {
    //Conteúdo principal do footer
    return (
        <div className="footer__content">
            <div className="footer__about">
                <h3 className="footer__about-title">SOBRE NÓS</h3>
                <p className="footer__about-description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
                    repellat nesciunt eius dolores nulla, atque suscipit rem voluptate
                    dignissimos accusamus sit quo non architecto ducimus culpa, numquam
                    sunt odit aspernatur?.
                </p>
                <div className="footer__about-links-wrapper">
                    <a className="common-link footer__common-link" href="#">
                        <FontAwesomeIcon
                            className="common-link__icon"
                            icon={["fas", "location-arrow"]}
                        />
                        <span className="common-link__content footer__link-content">
                            Rua Teste, 1234
                        </span>
                    </a>
                    <a className="common-link footer__common-link" href="#">
                        <FontAwesomeIcon
                            className="common-link__icon"
                            icon={["fas", "phone-flip"]}
                        />
                        <span className="common-link__content footer__link-content">
                            (79) 99999-9999
                        </span>
                    </a>
                    <a className="common-link footer__common-link" href="#">
                        <span className="common-link__content footer__link-content">
                            electrum@email.com
                        </span>
                    </a>
                </div>
            </div>
            <FooterLinks
                title="CATEGORIAS"
                links={[
                    { href: "#", name: "Promoções" },
                    { href: "#", name: "Headsets" },
                    { href: "#", name: "PC Gamer" },
                    { href: "#", name: "Câmeras" },
                    { href: "#", name: "Mouse e teclado" }
                ]}
            />
            <FooterLinks
                title="INFORMAÇÕES"
                links={[
                    { href: "#", name: "Sobre nós" },
                    { href: "#", name: "Entre em contato" },
                    { href: "#", name: "Política de privacidade" },
                    { href: "#", name: "Pedidos e devoluções" },
                    { href: "#", name: "Termos e condições" }
                ]}
            />
            <FooterLinks
                title="MENU"
                links={[
                    { href: "#", name: "Minha conta" },
                    { href: "#", name: "Carrinho" },
                    { href: "#", name: "Lista de desejos" },
                    { href: "#", name: "Rastrear pedido" }
                ]}
            />
        </div>
    )
}
