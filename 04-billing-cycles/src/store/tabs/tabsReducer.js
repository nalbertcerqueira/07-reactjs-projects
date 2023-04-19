import { tabsInitialState } from "./tabsInitialState"

export default function tabsReducer(state, { type, payload }) {
    switch (type) {
        case "SET_CURRENT_TAB": {
            return { ...state, currentTab: payload.currentTab }
        }
        case "RESET_TABS": {
            return tabsInitialState
        }
        case "SET_AND_NAVIGATE": {
            return { ...state, ...payload }
        }
        default: {
            return state
        }
    }
}
