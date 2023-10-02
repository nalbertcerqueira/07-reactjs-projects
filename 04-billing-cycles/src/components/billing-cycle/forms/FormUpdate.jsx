import propTypes from "prop-types"
import { useContext } from "react"

import { BillingCyclesContext } from "@/src/contexts/providers/BillingCyclesContext"
import { DashboardContext } from "@/src/contexts/providers/DashboardContext"
import { FormContext } from "@/src/contexts/providers/FormContext"
import { TabsContext } from "@/src/contexts/providers/TabsContext"
import useFormActions from "@/src/hooks/useFormActions"
import useTabsActions from "@/src/hooks/useTabsActions"

import Button from "@/src/components/common/Button"
import Input from "@/src/components/common/Input"
import ValidationMsg from "@/src/components/common/ValidationMsg"
import CreditList from "../credit-list/CreditList"
import DebtList from "../debt-list/DebtList"
import ValuesSummary from "./ValuesSummary"

import { formatBillingCycleISO, toastEmmitter } from "@/src/utils/client"

//Componente utilizado para editar um ciclo de pagamentos
//em billing-cycle.jsx
export default function FormUpdate(props) {
    const { clearSummaryCache } = useContext(DashboardContext)
    const { formState, formDispatch } = useContext(FormContext)
    const { tabsDispatch } = useContext(TabsContext)
    const { methods } = useContext(BillingCyclesContext)
    const { clearBillingCycleCache } = methods
    const formActions = useFormActions(formDispatch)
    const tabsActions = useTabsActions(tabsDispatch)

    async function submitForm(event) {
        event.preventDefault()

        if (!formActions.validateForm(formState)) {
            return toastEmmitter({
                id: "failed-create",
                message: "Por favor, corrija os erros do formulário antes de enviá-lo."
            })
        }
        const credits = formatBillingCycleISO(formState.credits)
        const debts = formatBillingCycleISO(formState.debts)
        const { _id, name, month, year } = formState
        await props.onSubmit({ _id, name, month, year, credits, debts })

        tabsActions.resetTabs()
        formActions.resetForm()
        clearSummaryCache("summary")
        clearBillingCycleCache("billingCycleList")
    }

    return (
        <form onSubmit={submitForm} className="text-base min-w-[480px]">
            <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                    <Input
                        placeholder="Ciclo de pagamento"
                        value={formState.name}
                        ariaInvalid={!formState.validations.name}
                        id="name"
                        name="name"
                        type="text"
                        label="Nome"
                        onChange={formActions.handleFieldChange}
                    />
                    {!formState.validations.name && (
                        <ValidationMsg className="mt-1">
                            <span>O nome deve ter no mínimo 4 caracteres.</span>
                        </ValidationMsg>
                    )}
                </div>
                <div className="w-full md:w-2/4">
                    <Input
                        placeholder="Mês de ocorrência"
                        value={formState.month}
                        ariaInvalid={!formState.validations.month}
                        id="month"
                        name="month"
                        type="tel"
                        label="Mês"
                        onChange={formActions.handleFieldChange}
                    />
                    {!formState.validations.month && (
                        <ValidationMsg className="mt-1">
                            <span>O mês deve ser um valor entre 1 e 12.</span>
                        </ValidationMsg>
                    )}
                </div>
                <div className="w-full md:w-2/4">
                    <Input
                        placeholder="Ano de ocorrência"
                        value={formState.year}
                        ariaInvalid={!formState.validations.year}
                        id="year"
                        name="year"
                        type="tel"
                        label="Ano"
                        onChange={formActions.handleFieldChange}
                    />
                    {!formState.validations.year && (
                        <ValidationMsg className="mt-1">
                            <span>O ano deve ser um valor entre 1970 e 2100.</span>
                        </ValidationMsg>
                    )}
                </div>
            </div>
            <div className="mt-6 flex gap-3 flex-col lg:flex-row w-full">
                <ValuesSummary />
            </div>
            <div className="mt-6 flex gap-3 flex-col xl:flex-row">
                <CreditList credits={formState.credits} fieldLegend="Créditos" />
                <DebtList debts={formState.debts} fieldLegend="Débitos" />
            </div>
            <div className="mt-6 flex gap-3 items-center">
                <Button disabled={props.isSubmiting} className="create-form-button" type="submit">
                    {props.isSubmiting ? "Salvando..." : "Salvar"}
                </Button>
                <Button
                    ariaLabel="limpar erros"
                    className="clear-form-button"
                    type="button"
                    onClick={() => {
                        tabsActions.resetTabs()
                        formActions.resetForm()
                    }}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    )
}
FormUpdate.propTypes = {
    onSubmit: propTypes.func,
    isSubmiting: propTypes.bool
}
