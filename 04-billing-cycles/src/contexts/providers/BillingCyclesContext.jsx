import propTypes from "prop-types"
import { createContext, useState } from "react"

export const BillingCyclesContext = createContext(null)

//Contexto responsável por manter o array de ciclos de pagamentos
export default function BillingCyclesProvider({ children }) {
    const [billingCyclesList, setBillingCycleList] = useState([])
    const [currentId, setCurrentId] = useState("")

    return (
        <BillingCyclesContext.Provider
            value={{
                billingCyclesList,
                currentId,
                methods: { setBillingCycleList, setCurrentId }
            }}
        >
            {children}
        </BillingCyclesContext.Provider>
    )
}
BillingCyclesProvider.propTypes = {
    children: propTypes.node
}
