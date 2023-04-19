import propTypes from "prop-types"
import { useContext } from "react"

import { TabsContext } from "@/src/contexts/providers/TabsContext"
import If from "../common/Conditional"

//Componente utilizado na página billing-cycle.jsx
export default function TabContent({ children, id }) {
    const { tabsState } = useContext(TabsContext)
    const tabContentActive = tabsState.currentTab === id ? "active" : ""

    return (
        <If condition={tabsState.visibleTabs.includes(id)}>
            <div className={`tab-content ${tabContentActive}`}>{children}</div>
        </If>
    )
}
TabContent.propTypes = {
    children: propTypes.node,
    id: propTypes.string
}
