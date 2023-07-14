import { BillingCyclesContext } from "@/src/contexts/providers/BillingCyclesContext"
import { DashboardContext } from "@/src/contexts/providers/DashboardContext"
import { FormContext } from "@/src/contexts/providers/FormContext"
import { TabsContext } from "@/src/contexts/providers/TabsContext"
import useFormActions from "@/src/hooks/useFormActions"
import useTabsActions from "@/src/hooks/useTabsActions"
import propTypes from "prop-types"
import { useContext } from "react"
import { ModalContext } from "../../contexts/providers/ModalContext"

import Button from "../common/Button"
import CloseIcon from "../icons/modal/CloseIcon"
import WarningIcon from "../icons/modal/WarningIcon"

//Componente utilizado na página billing-cycle.jsx durante a
//exclusão de um ciclo de pagamentos
export default function ModalDelete({ onSubmit, isSubmiting }) {
    const { billingCyclesList, currentId, methods } = useContext(BillingCyclesContext)
    const { clearSummaryCache } = useContext(DashboardContext)
    const { modalDelete } = useContext(ModalContext)
    const { formDispatch } = useContext(FormContext)
    const { tabsDispatch } = useContext(TabsContext)
    const { clearBillingCycleCache } = methods
    const formActions = useFormActions(formDispatch)
    const tabsActions = useTabsActions(tabsDispatch)

    async function confirmModal() {
        const currentCycle = billingCyclesList.filter((cycle) => cycle._id === currentId)[0]
        await onSubmit(currentCycle)

        modalDelete.changeState("hidden")
        tabsActions.resetTabs()
        formActions.resetForm()
        clearSummaryCache("summary")
        clearBillingCycleCache("billingCycleList")
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div>
                    <WarningIcon className="m-auto" />
                </div>
                <div>
                    <span
                        className="absolute top-4 right-4 cursor-pointer"
                        onClick={() => modalDelete.changeState("hidden")}
                    >
                        <CloseIcon />
                    </span>
                </div>
                <div className="mb-6 text-center text-zinc-700">
                    <h2 className="font-medium mb-2 text-lg">Atenção!</h2>
                    <p className="text-base">
                        Você está prestes a excluir um ciclo de pagamentos, tem certeza ?
                    </p>
                </div>
                <div className="justify-end gap-3 flex text-base">
                    <Button
                        disabled={isSubmiting}
                        type="button"
                        onClick={confirmModal}
                        className="delete-form-button"
                    >
                        {isSubmiting ? "Excluindo..." : "Excluir"}
                    </Button>
                    <Button
                        type="button"
                        onClick={() => modalDelete.changeState("hidden")}
                        className="clear-form-button m-0"
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    )
}
ModalDelete.propTypes = {
    onSubmit: propTypes.func,
    isSubmiting: propTypes.bool
}
