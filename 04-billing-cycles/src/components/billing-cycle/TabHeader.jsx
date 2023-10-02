import propTypes from "prop-types"
import { useContext } from "react"

import { TabsContext } from "@/src/contexts/providers/TabsContext"
import useTabsActions from "@/src/hooks/useTabsActions"
import If from "../common/Conditional"

//Componente utilizado na página billing-cycle.jsx
export default function TabHeader({ icon, label, className, target, ariaLabel }) {
    const { tabsState, tabsDispatch } = useContext(TabsContext)
    const { changeCurrentTab } = useTabsActions(tabsDispatch)
    const tabHeaderActive = tabsState.currentTab === target ? "active" : ""

    return (
        <If condition={tabsState.visibleTabs.includes(target)}>
            <li className={`tab-header ${className || ""} ${tabHeaderActive}`}>
                <button
                    aria-label={ariaLabel || null}
                    onClick={() => changeCurrentTab(target)}
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
    ariaLabel: propTypes.string,
    className: propTypes.string,
    target: propTypes.oneOfType([propTypes.string, propTypes.number])
}
