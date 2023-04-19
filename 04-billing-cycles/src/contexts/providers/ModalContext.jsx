import propTypes from "prop-types"
import { createContext, useState } from "react"

//Contexto de modais utilizado na página billing-cycle.jsx
export const ModalContext = createContext(null)
export default function ModalProvider({ children }) {
    const [modalDelete, setModalDelete] = useState("hidden")

    return (
        <ModalContext.Provider
            value={{
                modalDelete: {
                    state: modalDelete,
                    changeState: setModalDelete
                }
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}
ModalProvider.propTypes = {
    children: propTypes.node
}
