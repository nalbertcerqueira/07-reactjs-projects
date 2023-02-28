/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from "prop-types"
import { useContext } from "react"

import { Context as MainContext } from "../../contexts/MainContext"
import If from "../common/Conditional"

//Componente utilizado na página billing-cycle.jsx
export default function TabHeader({ icon, label, className, target }) {
    const { tabs } = useContext(MainContext)
    const tabHeaderActive = tabs.tabId === target ? "active" : ""

    return (
        <If condition={tabs.tabsVisible[target]}>
            <li className={`tab-header ${className || ""} ${tabHeaderActive}`}>
                <button
                    onClick={() => tabs.changeTabId(target)}
                    data-toggle="tab"
                    data-target={target}
                    type="button"
                    className="group/icon tab-header-button"
                >
                    <span>{icon}</span>
                    {label}
                </button>
            </li>
        </If>
    )
}
TabHeader.propTypes = {
    icon: propTypes.node,
    label: propTypes.string,
    className: propTypes.string,
    target: propTypes.oneOfType([propTypes.string, propTypes.number])
}
