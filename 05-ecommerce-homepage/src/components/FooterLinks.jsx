import propTypes from "prop-types"
import React from "react"

//Componente utilizado em Content.jsx em <footer></footer>
export default function FooterLinks({ title, links }) {
    function renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a className="footer-links__link" href={link.href}>
                        {link.name}
                    </a>
                </li>
            )
        })
    }

    return (
        <div className="footer-links">
            <h3 className="footer-links__title">{title}</h3>
            <ul className="footer-links__list">{renderLinks()}</ul>
        </div>
    )
}

FooterLinks.propTypes = {
    title: propTypes.string,
    links: propTypes.arrayOf(propTypes.objectOf(propTypes.string))
}
