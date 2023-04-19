import { BillingCyclesContext } from "@/src/contexts/providers/BillingCyclesContext"
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
export default function ModalDelete({ onSubmit }) {
    const { billingCyclesList, currentId } = useContext(BillingCyclesContext)
    const { modalDelete } = useContext(ModalContext)
    const { formDispatch } = useContext(FormContext)
    const { tabsDispatch } = useContext(TabsContext)
    const formActions = useFormActions(formDispatch)
    const tabsActions = useTabsActions(tabsDispatch)

    async function confirmModal() {
        const currentCycle = billingCyclesList.filter((cycle) => cycle.id === currentId)[0]
        await onSubmit(currentCycle)

        modalDelete.changeState("hidden")
        tabsActions.resetTabs()
        formActions.resetForm()
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
                        type="button"
                        onClick={confirmModal}
                        className="delete-form-button"
                    >
                        Excluir
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
    onSubmit: propTypes.func
}
