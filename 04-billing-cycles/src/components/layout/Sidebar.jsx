import Link from "next/link"
import { useContext } from "react"

import { MenuContext } from "@/src/contexts/providers/MenuContext"
import MoneyIcon from "../icons/MoneyIcon"
import Menu from "../menu/Menu"

//Componente utilizado em AppTemplate.jsx
export default function Sidebar() {
    const { menu, changeMenuState } = useContext(MenuContext)

    //Recolhendo o menu lateral caso o viewport possua largura inferior a 768px
    function hideMenu() {
        if (window.innerWidth <= 768) {
            changeMenuState("closed")
        }
    }

    const sidebarState = menu
    return (
        <div onMouseLeave={hideMenu} className={`sidebar ${sidebarState}`}>
            <Link className={`logo gap-3 ${menu === "open" ? "gap-3" : "md:gap-0"}`} href="/">
                <MoneyIcon className="stroke-white ml-2" />
                <span
                    className={`logo-name ${
                        menu === "open" ? "md:opacity-100" : "md:opacity-0 md:w-0"
                    }`}
                >
                    <b>My</b> Money
                </span>
            </Link>
            <Menu />
        </div>
    )
}
