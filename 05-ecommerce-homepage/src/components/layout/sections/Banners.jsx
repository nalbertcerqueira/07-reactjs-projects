import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Banner from "../../Banner"
import notebookBanner from "/img/banner-1.webp"
import accessorieBanner from "/img/banner-2.webp"
import cameraBanner from "/img/banner-3.webp"

//Componente utilizado em App.jsx
export default function Banners() {
    //Primeira sessão de conteúdo dentro de <main></main>
    return (
        <section className="banners">
            <div className="banners__inner">
                <Banner
                    imgSrc={notebookBanner}
                    imgAlt="notebook aberto em uma mesa"
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
                    imgAlt="headset em um suporte"
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
                    imgAlt="câmera profissional"
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
