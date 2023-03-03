/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useMemo } from "react"

import { Context as FormsContext } from "../../contexts/FormsContext"
import { Context as MainContext } from "../../contexts/MainContext"

import Button from "../common/Button"
import DeleteIcon from "../icons/bylling-cycle/DeleteIcon"
import EditIcon from "../icons/bylling-cycle/EditIcon"

//Lista de ciclo de pagamentos utilizado na página billing-cycle.jsx
export default function BillingCycleList() {
    const { billingCycle } = useContext(MainContext)
    const { methods } = useContext(FormsContext)

    useEffect(() => {
        billingCycle.getList()
    }, [])

    //useCallback pois essa função será passada para vários itens em uma lista
    const buttonAction = useCallback(
        (tabName, billingCycleId) => {
            methods.resetForm()
            billingCycle.showTab(tabName, billingCycleId)
        },
        [billingCycle.list]
    )

    //Renderizando as ações de cada linha da tabela
    function renderActions(id) {
        return (
            <div className="flex items-center justify-end gap-2">
                <Button
                    onClick={() => buttonAction("tabUpdate", id)}
                    className="update-button"
                    type="button"
                >
                    <EditIcon className="stroke-white w-5 h-5" />
                </Button>
                <Button
                    onClick={() => buttonAction("tabDelete", id)}
                    className="delete-button"
                    type="button"
                >
                    <DeleteIcon className="stroke-white" />
                </Button>
            </div>
        )
    }
    //Renderizando cada linha da tabela
    function renderRows(list) {
        if (list.length === 0) return null
        return list.map((value) => {
            return (
                <tr key={value.id} className="border-t border-zinc-300">
                    <td className="text-left py-3 px-2">{value.name}</td>
                    <td className="text-center py-3 px-2">{value.month}</td>
                    <td className="text-center py-3 px-2">{value.year}</td>
                    <td className="text-right py-3 px-2">{renderActions(value.id)}</td>
                </tr>
            )
        })
    }
    return useMemo(() => {
        return (
            <table className="w-full">
                <thead className="text-base">
                    <tr className="border-b-2 border-zinc-300">
                        <th className="text-left font-medium pb-3 px-2">Nome</th>
                        <th className="text-center font-medium pb-3 px-2">Mês</th>
                        <th className="text-center font-medium pb-3 px-2">Ano</th>
                        <th className="text-right font-medium pb-3 px-2">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-base">{renderRows(billingCycle.list)}</tbody>
            </table>
        )
    }, [billingCycle.list])
}
