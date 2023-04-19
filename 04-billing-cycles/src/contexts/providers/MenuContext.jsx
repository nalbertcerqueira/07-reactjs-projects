import propTypes from "prop-types"
import { createContext, useState } from "react"

//Contexto do menu lateral utilizando em Sidebar.jsx
export const MenuContext = createContext(null)

export default function MenuProvider({ children }) {
    const [menu, setMenuState] = useState("open")

    function changeMenuState() {
        setMenuState((prevState) => (prevState === "open" ? "closed" : "open"))
    }

    return (
        <MenuContext.Provider value={{ menu, changeMenuState }}>
            {children}
        </MenuContext.Provider>
    )
}
MenuProvider.propTypes = {
    children: propTypes.node
}
