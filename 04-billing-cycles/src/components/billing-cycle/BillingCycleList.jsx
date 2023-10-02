import { useContext } from "react"

import { BillingCyclesContext } from "@/src/contexts/providers/BillingCyclesContext"
import { FormContext } from "@/src/contexts/providers/FormContext"
import { TabsContext } from "@/src/contexts/providers/TabsContext"
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

    //Renderizando as ações de cada linha da tabela de ciclos de pagamentos
    function renderActions(id) {
        const filterById = (cycle) => cycle._id === id
        const currentBillingCycle = billingCyclesList.filter(filterById)[0]

        return (
            <div className="flex items-center justify-end gap-2">
                <Button
                    ariaLabel={`editar ciclo de pagamentos: ${currentBillingCycle.name}`}
                    className="update-button"
                    type="button"
                    onClick={() => {
                        methods.setCurrentId(id)
                        formActions.setAllFields(currentBillingCycle)
                        tabsActions.setAndNavigateToTab(["tabUpdate"], "tabUpdate")
                    }}
                >
                    <EditIcon className="stroke-white w-5 h-5" />
                </Button>
                <Button
                    ariaLabel={`excluir ciclo de pagamentos: ${currentBillingCycle.name}`}
                    className="delete-button"
                    type="button"
                    onClick={() => {
                        methods.setCurrentId(id)
                        formActions.setAllFields(currentBillingCycle)
                        tabsActions.setAndNavigateToTab(["tabDelete"], "tabDelete")
                    }}
                >
                    <DeleteIcon className="stroke-white" />
                </Button>
            </div>
        )
    }

    //Renderizando as linhas da tabela
    function renderRows(list) {
        if (list.length === 0) return null
        return list.map((item) => {
            return (
                <tr key={item._id} className="border-t border-zinc-300">
                    <td className="text-left py-3 px-2">{item.name}</td>
                    <td className="text-center py-3 px-2">{item.month}</td>
                    <td className="text-center py-3 px-2">{item.year}</td>
                    <td className="text-right py-3 px-2">{renderActions(item._id)}</td>
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
