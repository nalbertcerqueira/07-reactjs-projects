import propTypes from "prop-types"
import { createContext, useState } from "react"

const initialContext = {
    modalDelete: {
        state: "",
        changeState: () => {}
    }
}

//Contexto de modais utilizado na página billing-cycle.jsx
export const Context = createContext(initialContext)
export default function ModalsContext({ children }) {
    const [modalDelete, setModalDelete] = useState("hidden")
    return (
        <Context.Provider
            value={{
                modalDelete: {
                    state: modalDelete,
                    changeState: setModalDelete
                }
            }}
        >
            {children}
        </Context.Provider>
    )
}
ModalsContext.propTypes = {
    children: propTypes.node
}
