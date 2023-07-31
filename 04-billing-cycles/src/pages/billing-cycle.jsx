import { useContext, useEffect } from "react"

import { BillingCyclesContext } from "../contexts/providers/BillingCyclesContext"
import { ModalContext } from "../contexts/providers/ModalContext"

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
import { baseApiUrl } from "../utils/constants"

async function fetchBillingCycleList() {
    const res = await fetch(`${baseApiUrl}/api/billing-cycles`)
    const data = await res.json()
    if (!res.ok) {
        throw new Error(JSON.stringify(data))
    }
    return data
}

BillingCycle.PageTemplate = AppTemplate
export default function BillingCycle() {
    const { modalDelete } = useContext(ModalContext)
    const { methods } = useContext(BillingCyclesContext)
    const { getItemFromCache, setBillingCycleList } = methods
    const { isSending, apiMethods } = useApi(setBillingCycleList)

    //Buscando a lista de ciclos da pagamentos no cache ou através de uma chamada de API
    useEffect(() => {
        getItemFromCache("billingCycleList", fetchBillingCycleList)
            .then((data) => {
                if (data) setBillingCycleList(data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }, [getItemFromCache, setBillingCycleList])

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
                    <div className="p-4 tabs-content">
                        <TabContent id="tabList">
                            <BillingCycleList />
                        </TabContent>
                        <TabContent id="tabCreate" className="form-content">
                            <FormCreate isSubmiting={isSending} onSubmit={apiMethods.post} />
                        </TabContent>
                        <TabContent id="tabUpdate" className="form-content">
                            <FormUpdate isSubmiting={isSending} onSubmit={apiMethods.put} />
                        </TabContent>
                        <TabContent id="tabDelete" className="form-content">
                            <FormDelete isSubmiting={isSending} />
                        </TabContent>
                    </div>
                </div>
            </PageContent>
            <If condition={modalDelete.state !== "hidden"}>
                <ModalDelete isSubmiting={isSending} onSubmit={apiMethods.deletee} />
            </If>
        </>
    )
}
