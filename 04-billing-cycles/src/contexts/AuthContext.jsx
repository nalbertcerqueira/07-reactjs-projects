import propTypes from "prop-types"
import { createContext, useState } from "react"

const initialState = {
    username: "",
    email: "",
    setUser: () => {}
}

//Contexto utilizado em UserMenu.jsx para exibir o email e username do usuário
export const Context = createContext(initialState)
export default function AuthContext({ children }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    function setUser({ username, email }) {
        setUsername(username)
        setEmail(email)
    }

    return (
        <Context.Provider
            value={{
                username,
                email,
                setUser
            }}
        >
            {children}
        </Context.Provider>
    )
}
AuthContext.propTypes = {
    children: propTypes.node
}
