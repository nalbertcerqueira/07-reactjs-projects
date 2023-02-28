/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from "prop-types"
import { useContext } from "react"

import { Context as MainContext } from "../../contexts/MainContext"
import If from "../common/Conditional"

//Componente utilizado na página billing-cycle.jsx
export default function TabContent({ children, id }) {
    const { tabs } = useContext(MainContext)
    const tabContentActive = id === tabs.tabId ? "active" : ""

    return (
        <If condition={tabs.tabsVisible[id]}>
            <div className={`tab-content ${tabContentActive}`}>{children}</div>
        </If>
    )
}
TabContent.propTypes = {
    children: propTypes.node,
    id: propTypes.string
}
