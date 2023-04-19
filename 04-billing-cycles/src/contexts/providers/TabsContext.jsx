import { tabsInitialState, tabsReducer } from "@/src/store/tabs/config"
import propTypes from "prop-types"
import { createContext, useReducer } from "react"

export const TabsContext = createContext(null)

//Contexto das abas que aparecem ná página billing-cycle.jsx
export default function TabsProvider({ children }) {
    const [tabsState, tabsDispatch] = useReducer(tabsReducer, tabsInitialState)

    return (
        <TabsContext.Provider value={{ tabsState, tabsDispatch }}>
            {children}
        </TabsContext.Provider>
    )
}
TabsProvider.propTypes = {
    children: propTypes.node
}
