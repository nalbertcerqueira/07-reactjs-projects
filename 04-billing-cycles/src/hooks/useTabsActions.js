//Expondo os métodos para manipular as abas em billing-cycle.jsx
export default function useTabsActions(dispatch) {
    //Settando as abas visíveis e navegando até uma delas
    function setAndNavigateToTab(visibleTabs, tabToNavigate) {
        dispatch({
            type: "SET_AND_NAVIGATE",
            payload: { visibleTabs, currentTab: tabToNavigate }
        })
    }
    //Navegando até uma aba específica
    function changeCurrentTab(tabToNavigate) {
        dispatch({
            type: "SET_CURRENT_TAB",
            payload: { currentTab: tabToNavigate }
        })
    }
    //Resetando o estado
    function resetTabs() {
        dispatch({ type: "RESET_TABS" })
    }

    return {
        setAndNavigateToTab,
        changeCurrentTab,
        resetTabs
    }
}
