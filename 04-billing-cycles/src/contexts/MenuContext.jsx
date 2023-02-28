import propTypes from "prop-types"
import { createContext, useState } from "react"

//Contexto do menu lateral utilizando em Sidebar.jsx
export const Context = createContext({ menu: "open", changeMenuState: () => {} })
export default function MenuContext({ children }) {
    const [menu, setMenuState] = useState("open")

    function changeMenuState() {
        setMenuState((prevState) => (prevState === "open" ? "closed" : "open"))
    }

    return <Context.Provider value={{ menu, changeMenuState }}>{children}</Context.Provider>
}
MenuContext.propTypes = {
    children: propTypes.node
}
