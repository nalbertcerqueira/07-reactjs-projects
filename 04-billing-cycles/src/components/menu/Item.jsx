import Link from "next/link"
import propTypes from "prop-types"

//Componente utilizado em Menu.jsx e MenuTree.jsx
export default function Item({ tabIndex, className, path, icon, label }) {
    const tab = tabIndex || 0

    return (
        <li className={`${className || ""}`}>
            <Link tabIndex={tab} className="link group/icon" href={path}>
                <span className="ml-3">{icon}</span>
                <span className="block overflow-hidden">{label}</span>
            </Link>
        </li>
    )
}

Item.propTypes = {
    icon: propTypes.node,
    label: propTypes.string,
    path: propTypes.string,
    className: propTypes.string,
    tabIndex: propTypes.number
}
