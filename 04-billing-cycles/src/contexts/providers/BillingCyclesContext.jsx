import { queryCache } from "@/src/utils/client"
import propTypes from "prop-types"
import { createContext, useState } from "react"

export const BillingCyclesContext = createContext(null)
const clientCache = queryCache()

//Contexto utilizado para fornecer o array de ciclos de pagamentos
export default function BillingCyclesProvider({ children }) {
    const [billingCyclesList, setBillingCycleList] = useState([])
    const [currentId, setCurrentId] = useState("")

    return (
        <BillingCyclesContext.Provider
            value={{
                billingCyclesList,
                currentId,
                methods: {
                    setBillingCycleList,
                    setCurrentId,
                    clearBillingCycleCache: clientCache.removeItem,
                    getItemFromCache: clientCache.getItem
                }
            }}
        >
            {children}
        </BillingCyclesContext.Provider>
    )
}
BillingCyclesProvider.propTypes = {
    children: propTypes.node
}
