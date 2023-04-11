import propTypes from "prop-types"
import { createContext, useState } from "react"
import { toastEmmitter } from "../utils/client"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const initialContext = {
    userLanguage: null,
    setLanguage: () => {},
    dashboard: {
        error: false,
        isLoading: true,
        data: {},
        refresh: () => {}
    },
    tabs: {
        tabId: "",
        tabsVisible: {},
        changeTabId: () => {},
        chageVisibleTabs: () => {}
    },
    billingCycle: {
        list: [],
        resetState: () => {},
        getList: () => {},
        showTab: () => {},
        create: () => {},
        update: () => {},
        delete: () => {}
    },
    currentBC: {
        data: {},
        changeCurrentBC: () => {}
    }
}

//Contexto principal, utilizado em diversos componentes
export const Context = createContext(initialContext)
export default function MainContext({ children }) {
    const [userLanguage, setUserLangague] = useState(null)
    const [dashboardData, setDashboard] = useState(null)
    const [isDashboardLoading, setIsDashboardLoading] = useState(true)
    const [dashboardError, setDashboardError] = useState(false)

    const [tab, setTab] = useState("tabList")
    const [tabsVisible, setTabsVisible] = useState({ tabList: true, tabCreate: true })
    const [billingCycleList, setBillingCycleList] = useState([])
    const [currentBC, setCurrentBC] = useState({ name: "", month: "", year: "" })

    function setLanguage() {
        setUserLangague(window.navigator.language)
    }

    //Buscando dados para renderizar o dashboard em index.jsx
    async function refreshDashboard() {
        return fetch(`${baseUrl}/api/billing-cycles/summary`)
            .then(async (response) => {
                const data = await response.json()
                setIsDashboardLoading(false)
                setDashboardError(false)
                if (!response.ok) throw new Error(JSON.stringify(data))
                return setDashboard({ ...dashboardData, ...data.summary })
            })
            .catch(async (error) => {
                setDashboardError(true)
                console.log(error.message)
            })
    }

    //Funções utilizadas para definir em qual aba o usuário se encontra
    //como também quais delas devem ficar visíveis ou não
    function changeTabId(tabId) {
        setTab(tabId)
    }
    function showTabs(...tabsId) {
        const tabsToShow = {}
        tabsId.map((tabId) => {
            tabsToShow[tabId] = true
        })
        setTabsVisible(tabsToShow)
    }

    //Função genérica para fazer o submit de formulários
    async function submit(method, data, messages) {
        const id = data.id ? data.id : ""
        return fetch(`${baseUrl}/api/billing-cycles/${id}`, {
            method,
            body: JSON.stringify(data || {}),
            headers: { "Content-Type": "application/json" }
        })
            .then(async (response) => {
                const data = await response.json()
                console.log(data)
                if (!response.ok) throw new Error(JSON.stringify(data))
                else {
                    toastEmmitter({
                        message: messages?.success || "Operação realizada com sucesso!",
                        success: true
                    })
                    resetState()
                }
            })
            .catch((error) => {
                console.log(error.message)
                toastEmmitter({
                    message:
                        messages?.fail ||
                        `Desculpe, ocorreu um erro interno no servidor. Nossa equipe já foi notificada e está trabalhando para corrigir o problema.`,
                    id: `${method}-failed`
                })
            })
    }
    //Resetando o contexto ao seu estado inicial
    function resetState() {
        showTabs("tabList", "tabCreate")
        changeTabId("tabList")
    }

    function showTab(tabName, billingCycleId) {
        const foundBillingCycle = billingCycleList.find(
            (billingCycle) => billingCycle.id === billingCycleId
        )
        showTabs(tabName)
        changeTabId(tabName)
        changeCurrentBC(foundBillingCycle)
    }

    //Buscando dados para exibir a lista de cíclo de pagamentos
    async function getList(page, limit) {
        const queryString = page && limit ? `?page=${page}&limit=${limit}` : ""
        const url = `${baseUrl}/api/billing-cycles${queryString}`

        fetch(url)
            .then(async (response) => {
                const data = await response.json()
                if (!response.ok) throw new Error(data?.message || "Server internal error")
                return setBillingCycleList(data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    //Funções utilizadas para cadastrar, remover e alterar um cíclo de pagamentos
    async function create(data) {
        await submit("POST", data, { success: "Dados cadastrados com sucesso!" })
        await getList()
    }
    async function update(data) {
        await submit("PUT", data, { success: "Dados alterados com sucesso!" })
    }
    async function remove(data) {
        await submit("DELETE", data, {
            success: "Ciclo de pagamentos removido com sucesso!"
        })
    }

    //Alterando o cíclo pagamentos atual que será exibido na aba de edição ou exclusão
    function changeCurrentBC(billingCycle) {
        setCurrentBC({ ...currentBC, ...billingCycle })
    }

    return (
        <Context.Provider
            value={{
                userLanguage,
                setLanguage,
                dashboard: {
                    data: dashboardData,
                    isLoading: isDashboardLoading,
                    error: dashboardError,
                    refresh: refreshDashboard
                },
                tabs: {
                    tabId: tab,
                    changeTabId,
                    tabsVisible,
                    chageVisibleTabs: showTabs
                },
                billingCycle: {
                    list: billingCycleList,
                    resetState,
                    getList,
                    showTab,
                    create,
                    update,
                    delete: remove
                },
                currentBC: { data: currentBC, changeCurrentBC }
            }}
        >
            {children}
        </Context.Provider>
    )
}
MainContext.propTypes = {
    children: propTypes.node
}
