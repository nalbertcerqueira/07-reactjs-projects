import propTypes from "prop-types"
import { useContext } from "react"
import { Context as MenuContext } from "../../contexts/MenuContext"
import MenuIcon from "../icons/MenuIcon"
import UserMenu from "./UserMenu"

//Componente utilizado em AppTemplate.jsx
export default function Header({ className }) {
    const { changeMenuState } = useContext(MenuContext)

    return (
        <header className={`app-header ${className || ""}`}>
            <nav className="w-full flex items-center self-stretch">
                <button type="button" onClick={changeMenuState} className="py-2 menu-button">
                    <MenuIcon className="stroke-white" />
                </button>
                <UserMenu />
            </nav>
        </header>
    )
}

Header.propTypes = {
    className: propTypes.string,
    toggleMenu: propTypes.func
}
