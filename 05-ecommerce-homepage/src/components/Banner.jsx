import propTypes from "prop-types"
import React from "react"

//Componente utilizado em Banners.jsx em <main></main>
export default function Banner({ linkIcon, bannerTitle, id, imgSrc, imgAlt }) {
    return (
        <div className={`banner ${id || ""}`}>
            <img className="banner__bg-img" src={imgSrc} alt={imgAlt} />
            <div className="banner__cover"></div>
            <div className="banner__content">
                <h2 className="banner__title">{bannerTitle}</h2>
                <a className="banner__products-link" href="#">
                    Ver mais {linkIcon}
                </a>
            </div>
        </div>
    )
}
Banner.propTypes = {
    linkIcon: propTypes.node,
    bannerTitle: propTypes.string,
    id: propTypes.string,
    imgSrc: propTypes.string,
    imgAlt: propTypes.string
}
