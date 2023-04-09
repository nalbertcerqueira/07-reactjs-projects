import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Banner from "../../Banner"

//Componente utilizado em App.jsx
export default function Banners() {
    //Primeira sessão de conteúdo dentro de <main></main>
    return (
        <section className="banners">
            <div className="banners__inner">
                <Banner
                    imgSrc="/img/banner-1.jpg"
                    imgAlt="an open notebook on a table"
                    id="banner-1"
                    bannerTitle="Promoção de Notebooks"
                    linkIcon={
                        <FontAwesomeIcon
                            className="banner__link-icon"
                            icon={["fas", "circle-right"]}
                        />
                    }
                />
                <Banner
                    imgSrc="/img/banner-2.jpg"
                    imgAlt="a headseat on a suport"
                    id="banner-2"
                    bannerTitle="Lançamento de Acessórios"
                    linkIcon={
                        <FontAwesomeIcon
                            className="banner__link-icon"
                            icon={["fas", "circle-right"]}
                        />
                    }
                />
                <Banner
                    imgSrc="/img/banner-3.jpg"
                    imgAlt="a professional camera"
                    id="banner-3"
                    bannerTitle="Câmeras Potentes"
                    linkIcon={
                        <FontAwesomeIcon
                            className="banner__link-icon"
                            icon={["fas", "circle-right"]}
                        />
                    }
                />
            </div>
        </section>
    )
}
