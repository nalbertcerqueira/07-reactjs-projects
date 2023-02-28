import { useContext } from "react"

import { Context as FormsContext } from "../../contexts/FormsContext"
import { Context as MainContext } from "../../contexts/MainContext"
import { Context as ModalsContext } from "../../contexts/ModalsContext"

import Button from "../common/Button"
import CloseIcon from "../icons/modal/CloseIcon"
import WarningIcon from "../icons/modal/WarningIcon"

//Componente utilizado na página billing-cycle.jsx durante a
//exclusão de um cíclo de pagamentos
export default function ModalDelete() {
    const { currentBC, billingCycle } = useContext(MainContext)
    const { modalDelete } = useContext(ModalsContext)
    const { methods } = useContext(FormsContext)

    async function confirmModal() {
        await billingCycle.delete(currentBC.data)
        modalDelete.changeState("hidden")
        methods.resetForm()
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
                        onClick={() => {
                            modalDelete.changeState("hidden")
                        }}
                        className="clear-form-button m-0"
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    )
}
