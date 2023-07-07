import propTypes from "prop-types"
import { createContext, useEffect, useState } from "react"

//Contexto utilizado em UserMenu.jsx para exibir o email e username do usuário

export const UserContext = createContext(null)

export default function UserProvider({ children }) {
    const [user, setUser] = useState({ username: "", email: "" })

    useEffect(() => {
        fetchUser(setUser)
    }, [])

    function fetchUser() {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`)
            .then(async (res) => {
                const user = await res.json()
                setUser(user)
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
