import { useContext, useEffect } from "react"

import AppTemplate from "../components/AppTemplate"
import ErrorComponent from "../components/Error"
import DefaultHead from "../components/common/DefaultHead"
import PageContent from "../components/common/PageContent"
import PageHeader from "../components/common/PageHeader"
import DashboardLoading from "../components/dashboard/DashboardLoading"
import ValueBox from "../components/dashboard/ValueBox"
import BalanceIcon from "../components/icons/dashboard/BalanceIcon"
import BankIcon from "../components/icons/dashboard/BankIcon"
import DebtIcon from "../components/icons/dashboard/DebtIcon"
import { DashboardContext } from "../contexts/providers/DashboardContext"
import { convertCurrency } from "../utils/client"
import { baseApiUrl } from "../utils/constants"

async function fetchSummary() {
    const res = await fetch(`${baseApiUrl}/api/billing-cycles/summary`)
    const data = await res.json()
    if (!res.ok) {
        throw new Error(JSON.stringify(data))
    }
    return data
}

Dashboard.PageTemplate = AppTemplate
export default function Dashboard() {
    const { data, error, isLoading, setDashboard, getItemFromCache } = useContext(DashboardContext)
    const credits = convertCurrency(data?.credits || 0)
    const debts = convertCurrency(data?.debts || 0)
    const balance = convertCurrency(data?.credits - data?.debts || 0)

    //Buscando o sumário no cache ou através de uma chamada de API
    useEffect(() => {
        getItemFromCache("summary", fetchSummary)
            .then((data) => {
                if (data) {
                    const newState = { data: data.summary, isLoading: false, error: false }
                    setDashboard(newState)
                }
            })
            .catch((error) => {
                setDashboard((prevState) => ({ ...prevState, isLoading: false, error: true }))
                console.log(error)
                console.log(error.message)
            })
    }, [getItemFromCache, setDashboard])

    if (error) {
        return (
            <>
                <DefaultHead title="MyMoney App | Dashboard" />
                <PageHeader title="Dashboard" small="Versão 1.0.0" />
                <PageContent>
                    <ErrorComponent />
                </PageContent>
            </>
        )
    }

    return (
        <>
            <DefaultHead title="MyMoney App | Dashboard" />
            <PageHeader title="Dashboard" small="Versão 1.0.0" />
            <PageContent>
                {isLoading ? (
                    <DashboardLoading />
                ) : (
                    <div
                        className="flex gap-3 flex-col lg:flex-row w-full
                            animate-[show_0.2s_forwards]"
                    >
                        <ValueBox
                            icon={<BankIcon stroke="stroke-green-700 w-20 h-20" />}
                            color="bg-green-600"
                            footerBgColor="bg-green-700"
                            className="w-full min-w-[230px]"
                            text="Total de Créditos"
                            value={credits}
                        />
                        <ValueBox
                            icon={<DebtIcon stroke="stroke-red-700 w-20 h-20" />}
                            color="bg-red-600"
                            footerBgColor="bg-red-700"
                            className="w-full min-w-[230px]"
                            text="Total de Débitos"
                            value={debts}
                        />
                        <ValueBox
                            icon={<BalanceIcon stroke="stroke-sky-700 w-20 h-20" />}
                            color="bg-sky-600"
                            footerBgColor="bg-sky-700"
                            className="w-full min-w-[230px]"
                            text="Saldo geral"
                            value={balance}
                        />
                    </div>
                )}
            </PageContent>
        </>
    )
}
