import { useContext } from "react"

import AppTemplate from "../components/AppTemplate"
import Error from "../components/Error"
import DefaultHead from "../components/common/DefaultHead"
import PageContent from "../components/common/PageContent"
import PageHeader from "../components/common/PageHeader"
import DashboardLoading from "../components/dashboard/DashboardLoading"
import ValueBox from "../components/dashboard/ValueBox"
import BalanceIcon from "../components/icons/dashboard/BalanceIcon"
import BankIcon from "../components/icons/dashboard/BankIcon"
import DebtIcon from "../components/icons/dashboard/DebtIcon"
import { DashboardContext } from "../contexts/providers/DashboardContext"
import useFetchDashboard from "../hooks/useFetchDashboard"
import { convertCurrency } from "../utils/client"

Dashboard.PageTemplate = AppTemplate
export default function Dashboard() {
    const { data, error, isLoading, setDashboard } = useContext(DashboardContext)
    const credits = convertCurrency(data?.credits || 0)
    const debts = convertCurrency(data?.debts || 0)
    const balance = convertCurrency(data?.credits - data?.debts || 0)

    useFetchDashboard(setDashboard)

    if (error) {
        return (
            <>
                <DefaultHead title="MyMoney App | Dashboard" />
                <PageHeader title="Dashboard" small="Versão 1.0.0" />
                <PageContent>
                    <Error />
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
