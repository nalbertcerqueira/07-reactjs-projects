/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from "prop-types"
import { useContext, useEffect, useMemo } from "react"

import { Context as MainContext } from "../contexts/MainContext"
import { Context as ModalsContext } from "../contexts/ModalsContext"
import { Context as UserContext } from "../contexts/UserContext"

import AppTemplate from "../components/AppTemplate"
import BillingCycleList from "../components/billing-cycle/BillingCycleList"
import FormCreate from "../components/billing-cycle/forms/FormCreate"
import FormDelete from "../components/billing-cycle/forms/FormDelete"
import FormUpdate from "../components/billing-cycle/forms/FormUpdate"
import ModalDelete from "../components/billing-cycle/ModalDelete"
import TabContent from "../components/billing-cycle/TabContent"
import TabHeader from "../components/billing-cycle/TabHeader"
import If from "../components/common/Conditional"
import DefaultHead from "../components/common/DefaultHead"
import PageContent from "../components/common/PageContent"
import PageHeader from "../components/common/PageHeader"

import AddIcon from "../components/icons/bylling-cycle/AddIcon"
import DeleteIcon from "../components/icons/bylling-cycle/DeleteIcon"
import EditIcon from "../components/icons/bylling-cycle/EditIcon"
import ListIcon from "../components/icons/bylling-cycle/ListIcon"

//Validando o token do usuário antes de exibir a aplicação
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

BillingCycle.PageTemplate = AppTemplate
export default function BillingCycle({ username, email }) {
    const { setUser } = useContext(UserContext)
    const { billingCycle } = useContext(MainContext)
    const { modalDelete } = useContext(ModalsContext)

    useEffect(() => {
        setUser({ email, username })
    }, [])

    return useMemo(() => {
        return (
            <>
                <DefaultHead title="MyMoney App | Billing Cycle" />
                <PageHeader title="Ciclos de Pagamentos" small="Cadastro" />
                <PageContent>
                    <div className="rounded-md overflow-hidden shadow-base bg-slate-100">
                        <ul className="tabs-header">
                            <TabHeader
                                label="Listar"
                                target="tabList"
                                icon={<ListIcon className="tab-header-icon" />}
                            />
                            <TabHeader
                                label="Incluir"
                                target="tabCreate"
                                icon={<AddIcon className="tab-header-icon" />}
                            />
                            <TabHeader
                                label="Alterar"
                                target="tabUpdate"
                                icon={<EditIcon className="tab-header-icon w-4 h-4" />}
                            />
                            <TabHeader
                                label="Excluir"
                                target="tabDelete"
                                icon={<DeleteIcon className="tab-header-icon" />}
                            />
                        </ul>
                        <div className="py-3 px-4 tabs-content">
                            <TabContent id="tabList">
                                <BillingCycleList />
                            </TabContent>
                            <TabContent id="tabCreate">
                                <FormCreate onSubmit={billingCycle.create} />
                            </TabContent>
                            <TabContent id="tabUpdate">
                                <FormUpdate onSubmit={billingCycle.update} />
                            </TabContent>
                            <TabContent id="tabDelete">
                                <FormDelete />
                            </TabContent>
                        </div>
                    </div>
                </PageContent>
                <If condition={modalDelete.state !== "hidden"}>
                    <ModalDelete />
                </If>
            </>
        )
    }, [modalDelete.state])
}
BillingCycle.propTypes = {
    username: propTypes.string,
    email: propTypes.string
}
