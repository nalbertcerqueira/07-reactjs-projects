import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Banner from "../../Banner"
import notebookBanner from "/img/banner-1.jpg"
import accessorieBanner from "/img/banner-2.jpg"
import cameraBanner from "/img/banner-3.jpg"

//Componente utilizado em App.jsx
export default function Banners() {
    //Primeira sessão de conteúdo dentro de <main></main>
    return (
        <section className="banners">
            <div className="banners__inner">
                <Banner
                    imgSrc={notebookBanner}
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
                    imgSrc={accessorieBanner}
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
                    imgSrc={cameraBanner}
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
