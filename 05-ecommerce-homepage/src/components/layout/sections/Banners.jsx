import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Banner from "../../Banner"
import notebookBanner from "/img/banner-1.webp"
import accessorieBanner from "/img/banner-2.webp"
import cameraBanner from "/img/banner-3.webp"

const banners = [
    {
        imgSrc: notebookBanner,
        imgAlt: "notebook aberto em cima de uma mesa",
        id: "banner-1",
        bannerTitle: "Promoção de Notebooks"
    },
    {
        imgSrc: accessorieBanner,
        imgAlt: "headset em um suporte",
        id: "banner-2",
        bannerTitle: "Lançamento de Acessórios"
    },
    {
        imgSrc: cameraBanner,
        imgAlt: "câmera profissional",
        id: "banner-3",
        bannerTitle: "Câmeras Potentes"
    }
]

//Componente utilizado em App.jsx
export default function Banners() {
    //Primeira sessão de conteúdo
    return (
        <section className="banners">
            <div className="banners__inner">
                {banners.map((banner, i) => (
                    <Banner
                        key={i}
                        imgSrc={banner.imgSrc}
                        imgAlt={banner.imgAlt}
                        id={banner.id}
                        bannerTitle={banner.bannerTitle}
                        linkIcon={
                            <FontAwesomeIcon
                                className="banner__link-icon"
                                icon={["fas", "circle-right"]}
                            />
                        }
                    />
                ))}
            </div>
        </section>
    )
}
