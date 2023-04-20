import propTypes from "prop-types"
import { useContext, useEffect } from "react"

import { ModalContext } from "../contexts/providers/ModalContext"
import { UserContext } from "../contexts/providers/UserContext"

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
import useApi from "../hooks/useApi"

import AddIcon from "../components/icons/bylling-cycle/AddIcon"
import DeleteIcon from "../components/icons/bylling-cycle/DeleteIcon"
import EditIcon from "../components/icons/bylling-cycle/EditIcon"
import ListIcon from "../components/icons/bylling-cycle/ListIcon"
import { BillingCyclesContext } from "../contexts/providers/BillingCyclesContext"

//Validando o token do usuário antes de exibir a aplicação
export async function getServerSideProps({ req }) {
    return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth-validation`, {
        method: "GET",
        headers: { Cookie: req.headers.cookie }
    })
        .then(async (response) => {
            const { username, email } = await response.json()
            if (!response.ok) throw new Error("Error")
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
    const { modalDelete } = useContext(ModalContext)
    const { methods } = useContext(BillingCyclesContext)
    const apiMethods = useApi(methods.setBillingCycleList)

    useEffect(() => {
        let ignore = false
        if (!ignore) setUser({ username, email })
        return () => {
            ignore = true
        }
    }, [setUser, email, username])

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
                            <FormCreate onSubmit={apiMethods.post} />
                        </TabContent>
                        <TabContent id="tabUpdate">
                            <FormUpdate onSubmit={apiMethods.put} />
                        </TabContent>
                        <TabContent id="tabDelete">
                            <FormDelete />
                        </TabContent>
                    </div>
                </div>
            </PageContent>
            <If condition={modalDelete.state !== "hidden"}>
                <ModalDelete onSubmit={apiMethods.deletee} />
            </If>
        </>
    )
}
BillingCycle.propTypes = {
    username: propTypes.string,
    email: propTypes.string
}
