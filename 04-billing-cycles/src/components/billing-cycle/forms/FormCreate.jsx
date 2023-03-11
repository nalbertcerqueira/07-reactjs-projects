/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from "prop-types"
import { useContext, useEffect } from "react"

import Buttton from "../../common/Button"
import Input from "../../common/Input"
import ValidationMsg from "../../common/ValidationMsg"
import CreditList from "../credit-list/CreditList"
import DebtList from "../debt-list/DebtList"
import ValuesSummary from "./ValuesSummary"

import { Context as FormsContext } from "../../../contexts/FormsContext"
import {
    calculateSummary,
    formatBillingCycleISO,
    formatValuePTBR,
    toastEmmitter
} from "../../../utils/client"

//Componente utilizado para o cadastro de um novo cíclo de pagamentos
//em billing-cycle.jsx
export default function FormCreate(props) {
    const { methods, name, month, year, summary, flags, creditList, debtList } =
        useContext(FormsContext)

    useEffect(() => {
        const credits = creditList.data
        const debts = debtList.data
        methods.changeSummary(calculateSummary({ credits, debts }))
    }, [creditList.data, debtList.data])

    async function submitForm(event) {
        event.preventDefault()

        if (methods.validateAllForm() === false) {
            return toastEmmitter({
                id: "failed-create",
                message: "Por favor, corrija os erros do forumlário antes de enviá-lo."
            })
        }
        const credits = formatBillingCycleISO(creditList.data)
        const debts = formatBillingCycleISO(debtList.data)
        await props.onSubmit({ name, month, year, credits, debts })

        methods.resetForm()
    }

    return (
        <form className="text-base min-w-[480px]" onSubmit={submitForm}>
            <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                    <Input
                        placeholder="Ciclo de pagamento"
                        value={name}
                        id="name"
                        name="name"
                        type="text"
                        label="Nome"
                        onChange={methods.changeName}
                    />
                    {!flags.name && (
                        <ValidationMsg
                            className="mt-1"
                            message="O nome deve ter no minímo 4 caracteres."
                        />
                    )}
                </div>
                <div className="w-full md:w-2/4">
                    <Input
                        placeholder="Mês de ocorrência"
                        value={month}
                        id="month"
                        name="month"
                        type="tel"
                        label="Mês"
                        onChange={methods.changeMonth}
                    />
                    {!flags.month && (
                        <ValidationMsg
                            className="mt-1"
                            message="Apenas valores entre 1 e 12."
                        />
                    )}
                </div>
                <div className="w-full md:w-2/4">
                    <Input
                        placeholder="Ano de ocorrência"
                        value={year}
                        id="year"
                        name="year"
                        type="tel"
                        label="Ano"
                        onChange={methods.changeYear}
                    />
                    {!flags.year && (
                        <ValidationMsg
                            className="mt-1"
                            message="Apenas valores entre 1970 e 2100."
                        />
                    )}
                </div>
            </div>
            <div className="mt-6 flex gap-3 flex-col lg:flex-row w-full">
                <ValuesSummary
                    credit={formatValuePTBR(summary.credit)}
                    debt={formatValuePTBR(summary.debt)}
                    balance={formatValuePTBR(summary.balance)}
                />
            </div>
            <div className="mt-6 flex gap-3 flex-col xl:flex-row">
                <CreditList fieldLegend="Créditos" data={creditList} />
                <DebtList fieldLegend="Débitos" data={debtList} />
            </div>
            <div className="mt-6 flex gap-3 items-center">
                <Buttton className="create-form-button" type="submit">
                    Enviar
                </Buttton>
                <Buttton
                    onClick={() => {
                        methods.clearAllErrors()
                    }}
                    className="animate-[show_0.1s_forwards] clear-form-button"
                    type="button"
                    optionalHandler={methods.isFormValid}
                >
                    Limpar
                </Buttton>
            </div>
        </form>
    )
}
FormCreate.propTypes = {
    onSubmit: propTypes.func
}
