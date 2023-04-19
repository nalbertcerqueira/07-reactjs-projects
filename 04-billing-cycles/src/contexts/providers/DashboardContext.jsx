import propTypes from "prop-types"
import { createContext, useState } from "react"

export const DashboardContext = createContext(null)

//Contexto utilizado para menter o resumo de créditos, débitos e saldo
export default function DashboardProvider({ children }) {
    const [dashboard, setDashboard] = useState({ data: null, isLoading: true, error: false })

    return (
        <DashboardContext.Provider
            value={{
                data: dashboard.data,
                isLoading: dashboard.isLoading,
                error: dashboard.error,
                setDashboard
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}
DashboardProvider.propTypes = {
    children: propTypes.node
}
