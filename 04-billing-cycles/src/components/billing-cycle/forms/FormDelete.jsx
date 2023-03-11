/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from "prop-types"
import { useContext, useEffect } from "react"

import Buttton from "../../common/Button"
import Input from "../../common/Input"
import CreditList from "../credit-list/CreditList"
import DebtList from "../debt-list/DebtList"
import ValuesSummary from "./ValuesSummary"

import { Context as FormsContext } from "../../../contexts/FormsContext"
import { Context as MainContext } from "../../../contexts/MainContext"
import { Context as ModalsContext } from "../../../contexts/ModalsContext"
import {
    calculateSummary,
    formatBillingCyclePTBR,
    formatValuePTBR
} from "../../../utils/client"

//Componente utilizado para a exclusão de um cíclo de pagamentos
//em billing-cycle.jsx
export default function FormDelete() {
    const { currentBC, billingCycle } = useContext(MainContext)
    const { modalDelete } = useContext(ModalsContext)
    const { methods, name, month, year, summary, creditList, debtList } =
        useContext(FormsContext)

    useEffect(() => {
        methods.setAllData(formatBillingCyclePTBR(currentBC.data))
    }, [])

    useEffect(() => {
        const credits = creditList.data
        const debts = debtList.data
        methods.changeSummary(calculateSummary({ credits, debts }))
    }, [creditList.data, debtList.data])

    return (
        <>
            <form
                className="text-base min-w-[480px]"
                onSubmit={async (event) => {
                    event.preventDefault()
                    modalDelete.changeState("open")
                }}
            >
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full">
                        <Input
                            readOnly
                            placeholder="Ciclo de pagamento"
                            value={name}
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
                            value={month}
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
                            value={year}
                            id="year"
                            name="year"
                            type="tel"
                            label="Ano"
                        />
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
                    <CreditList data={creditList} fieldLegend="Créditos" readOnly />
                    <DebtList data={debtList} fieldLegend="Débitos" readOnly />
                </div>
                <div className=" mt-6 flex gap-3 items-center">
                    <Buttton className="delete-form-button" type="submit">
                        Excluir
                    </Buttton>
                    <Buttton
                        onClick={() => {
                            billingCycle.resetState()
                            methods.resetForm()
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
FormDelete.propTypes = {
    onSubmit: propTypes.func
}
