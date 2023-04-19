import { useContext } from "react"

import Buttton from "../../common/Button"
import Input from "../../common/Input"
import CreditList from "../credit-list/CreditList"
import DebtList from "../debt-list/DebtList"
import ValuesSummary from "./ValuesSummary"

import { FormContext } from "@/src/contexts/providers/FormContext"
import { ModalContext } from "@/src/contexts/providers/ModalContext"
import { TabsContext } from "@/src/contexts/providers/TabsContext"
import useFormActions from "@/src/hooks/useFormActions"
import useTabsActions from "@/src/hooks/useTabsActions"

//Componente utilizado para a exclusão de um ciclo de pagamentos
//em billing-cycle.jsx
export default function FormDelete() {
    const { modalDelete } = useContext(ModalContext)
    const { tabsDispatch } = useContext(TabsContext)
    const { formState, formDispatch } = useContext(FormContext)
    const formActions = useFormActions(formDispatch)
    const tabsActions = useTabsActions(tabsDispatch)

    return (
        <>
            <form className="text-base min-w-[480px]">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full">
                        <Input
                            readOnly
                            placeholder="Ciclo de pagamento"
                            value={formState.name}
                            id="name"
                            name="name"
                            type="text"
                            label="Nome"
                        />
                    </div>
                    <div className="w-full md:w-2/4">
                        <Input
                            readOnly
                            placeholder="Mês de ocorrência"
                            value={formState.month}
                            id="month"
                            name="month"
                            type="tel"
                            label="Mês"
                        />
                    </div>
                    <div className="w-full md:w-2/4">
                        <Input
                            readOnly
                            placeholder="Ano de ocorrência"
                            value={formState.year}
                            id="year"
                            name="year"
                            type="tel"
                            label="Ano"
                        />
                    </div>
                </div>
                <div className="mt-6 flex gap-3 flex-col lg:flex-row w-full">
                    <ValuesSummary />
                </div>
                <div className="mt-6 flex gap-3 flex-col xl:flex-row">
                    <CreditList credits={formState.credits} fieldLegend="Créditos" readOnly />
                    <DebtList debts={formState.debts} fieldLegend="Débitos" readOnly />
                </div>
                <div className=" mt-6 flex gap-3 items-center">
                    <Buttton
                        onClick={async (event) => {
                            event.preventDefault()
                            modalDelete.changeState("open")
                        }}
                        className="delete-form-button"
                        type="submit"
                    >
                        Excluir
                    </Buttton>
                    <Buttton
                        onClick={() => {
                            formActions.resetForm()
                            tabsActions.resetTabs()
                        }}
                        className="clear-form-button"
                        type="button"
                    >
                        Cancelar
                    </Buttton>
                </div>
            </form>
        </>
    )
}
