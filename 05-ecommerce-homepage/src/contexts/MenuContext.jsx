import propTypes from "prop-types"
import React, { createContext, useState } from "react"

//Contexto utilizado em HeaderBottom.jsx e HeaderMiddle.jsx
export const Context = createContext({
    isOpen: false,
    toggleMenuState: () => {}
})

export default function MenuContext({ children }) {
    const [isOpen, setIsOpen] = useState(false)

    function toggleMenuState() {
        setIsOpen((prevState) => (prevState ? false : true))
    }

    return (
        <Context.Provider value={{ isOpen, toggleMenuState }}>
            {children}
        </Context.Provider>
    )
}

MenuContext.propTypes = {
    children: propTypes.node
}
