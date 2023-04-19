import propTypes from "prop-types"
import { createContext, useState } from "react"

//Contexto utilizado em UserMenu.jsx para exibir o email e username do usuário
export const UserContext = createContext(null)

export default function UserProvider({ children }) {
    const [user, setUser] = useState({ username: "", email: "" })

    return (
        <UserContext.Provider
            value={{
                username: user.username,
                email: user.email,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
UserProvider.propTypes = {
    children: propTypes.node
}
