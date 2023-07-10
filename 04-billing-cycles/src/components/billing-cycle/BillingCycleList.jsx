import { useContext } from "react"

import { BillingCyclesContext } from "@/src/contexts/providers/BillingCyclesContext"
import { FormContext } from "@/src/contexts/providers/FormContext"
import { TabsContext } from "@/src/contexts/providers/TabsContext"
import useFetchBillingCycles from "@/src/hooks/useFetchBillingCycles"
import useFormActions from "@/src/hooks/useFormActions"
import useTabsActions from "@/src/hooks/useTabsActions"
import Button from "../common/Button"
import DeleteIcon from "../icons/bylling-cycle/DeleteIcon"
import EditIcon from "../icons/bylling-cycle/EditIcon"

//Lista de ciclo de pagamentos utilizado na página billing-cycle.jsx
export default function BillingCycleList() {
    const { billingCyclesList, methods } = useContext(BillingCyclesContext)
    const { tabsDispatch } = useContext(TabsContext)
    const { formDispatch } = useContext(FormContext)
    const tabsActions = useTabsActions(tabsDispatch)
    const formActions = useFormActions(formDispatch)

    useFetchBillingCycles(methods.setBillingCycleList)

    //Renderizando as ações de cada linha da tabela
    function renderActions(id) {
        return (
            <div className="flex items-center justify-end gap-2">
                <Button
                    onClick={() => {
                        const currentCycle = billingCyclesList.filter(
                            (cycle) => cycle._id === id
                        )[0]
                        methods.setCurrentId(id)
                        formActions.setAllFields(currentCycle)
                        tabsActions.setAndNavigateToTab(["tabUpdate"], "tabUpdate")
                    }}
                    className="update-button"
                    type="button"
                >
                    <EditIcon className="stroke-white w-5 h-5" />
                </Button>
                <Button
                    onClick={() => {
                        const currentCycle = billingCyclesList.filter(
                            (cycle) => cycle._id === id
                        )[0]
                        methods.setCurrentId(id)
                        formActions.setAllFields(currentCycle)
                        tabsActions.setAndNavigateToTab(["tabDelete"], "tabDelete")
                    }}
                    className="delete-button"
                    type="button"
                >
                    <DeleteIcon className="stroke-white" />
                </Button>
            </div>
        )
    }

    //Renderizando as linhas da tabela
    function renderRows(list) {
        if (list.length === 0) return null
        return list.map((value) => {
            return (
                <tr key={value._id} className="border-t border-zinc-300">
                    <td className="text-left py-3 px-2">{value.name}</td>
                    <td className="text-center py-3 px-2">{value.month}</td>
                    <td className="text-center py-3 px-2">{value.year}</td>
                    <td className="text-right py-3 px-2">{renderActions(value._id)}</td>
                </tr>
            )
        })
    }

    return (
        <>
            <table className="w-full">
                <thead className="text-base">
                    <tr className="border-b-2 border-zinc-300">
                        <th className="text-left font-medium pb-3 px-2">Nome</th>
                        <th className="text-center font-medium pb-3 px-2">Mês</th>
                        <th className="text-center font-medium pb-3 px-2">Ano</th>
                        <th className="text-right font-medium pb-3 px-2">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-base">{renderRows(billingCyclesList)}</tbody>
            </table>
        </>
    )
}
