import propTypes from "prop-types"

//Componente utilizado em AppTemplate.jsx
export default function Footer({ className }) {
    return (
        <footer className={`footer ${className || ""}`}>
            <div>
                <p className="font-medium">Copyright © 2023</p>
            </div>
            <div>
                <p>
                    <span>Coded by: </span>
                    <a
                        target="_blank"
                        className="footer-link"
                        href="https://github.com/nalbertcerqueira"
                    >
                        Nalbert Cerqueira
                    </a>
                </p>
            </div>
        </footer>
    )
}
Footer.propTypes = {
    className: propTypes.string
}
