import { queryCache } from "@/src/utils/client"
import propTypes from "prop-types"
import { createContext, useState } from "react"

export const DashboardContext = createContext(null)
const clientCache = queryCache()

//Contexto utilizado para fornecer o resumo de créditos, débitos e saldo
export default function DashboardProvider({ children }) {
    const [dashboard, setDashboard] = useState({ data: {}, isLoading: true, error: false })

    return (
        <DashboardContext.Provider
            value={{
                data: dashboard.data,
                isLoading: dashboard.isLoading,
                error: dashboard.error,
                setDashboard,
                clearSummaryCache: clientCache.removeItem,
                getItemFromCache: clientCache.getItem
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}
DashboardProvider.propTypes = {
    children: propTypes.node
}
