/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from "prop-types"

import { useContext, useEffect, useMemo } from "react"
import { Context as AuthContext } from "../contexts/AuthContext"
import { Context as MainContext } from "../contexts/MainContext"

import AppTemplate from "../components/AppTemplate"
import DefaultHead from "../components/common/DefaultHead"
import PageContent from "../components/common/PageContent"
import PageHeader from "../components/common/PageHeader"
import DashboardLoading from "../components/dashboard/DashboardLoading"
import ValueBox from "../components/dashboard/ValueBox"
import Error from "../components/Error"
import BalanceIcon from "../components/icons/dashboard/BalanceIcon"
import BankIcon from "../components/icons/dashboard/BankIcon"
import DebtIcon from "../components/icons/dashboard/DebtIcon"

//Verificando se o JWT do usuário é válido e redirecionando
//para a página de login caso contrário.
export async function getServerSideProps({ req }) {
    return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth-validation`, {
        method: "GET",
        headers: { Cookie: req.headers.cookie }
    })
        .then(async (response) => {
            const { username, email } = await response.json()
            if (!response.ok) return { redirect: { destination: "/login", permanent: false } }
            else return { props: { username, email } }
        })
        .catch((error) => {
            console.log(error.message)
            return { redirect: { destination: "/login", permanent: false } }
        })
}

Dashboard.PageTemplate = AppTemplate
export default function Dashboard({ username, email }) {
    const { dashboard, setLanguage, userLanguage } = useContext(MainContext)
    const { setUser } = useContext(AuthContext)

    const credits = convertCurrency(dashboard.data?.credits || 0)
    const debts = convertCurrency(dashboard.data?.debts || 0)
    const balance = convertCurrency(dashboard.data?.credits - dashboard.data?.debts || 0)

    function convertCurrency(value) {
        if (!userLanguage) return value
        return value.toLocaleString(userLanguage, {
            style: "currency",
            currency: "BRL"
        })
    }

    useEffect(() => {
        ;[setUser({ username, email }), setLanguage(), dashboard.refresh()]
    }, [])

    return useMemo(() => {
        if (dashboard.error) {
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
                    {dashboard.isLoading ? (
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
    }, [dashboard])
}
Dashboard.propTypes = {
    username: propTypes.string,
    email: propTypes.string
}
