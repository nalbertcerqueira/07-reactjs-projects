import { MenuContext } from "@/src/contexts/providers/MenuContext"
import propTypes from "prop-types"
import { useContext } from "react"
import MenuIcon from "../icons/MenuIcon"
import UserMenu from "./UserMenu"

//Componente utilizado em AppTemplate.jsx
export default function Header({ className }) {
    const { changeMenuState, menu } = useContext(MenuContext)
    const buttonLabel = menu === "open" ? "recolher menu de navegação" : "exibir menu de navegação"

    return (
        <header className={`app-header ${className || ""}`}>
            <nav className="w-full flex items-center self-stretch">
                <button
                    aria-label={buttonLabel}
                    type="button"
                    onClick={changeMenuState}
                    className="py-2 menu-button"
                >
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
