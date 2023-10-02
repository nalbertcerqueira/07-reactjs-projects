import propTypes from "prop-types"
import { useContext } from "react"

import { FormContext } from "@/src/contexts/providers/FormContext"
import useFormActions from "@/src/hooks/useFormActions"
import ValidationMsg from "../../common/ValidationMsg"
import DebtRow from "./DebtRow"

//Lista de débitos com inputs que serão adicionados dinamicamente
//aos formulários FormCreate, FormUpdate e FormDelete.jsx
export default function DebtList({ fieldLegend, debts, readOnly }) {
    const { formState, formDispatch } = useContext(FormContext)
    const { handleNestedFieldChange, addCreditDebt, removeCreditDebt } =
        useFormActions(formDispatch)

    //Renderizando cada linha da tabela
    function renderRows() {
        return debts.map((debt, index) => {
            return (
                <DebtRow
                    key={debt?._id || index}
                    id={debt?._id || index}
                    readOnly={readOnly}
                    name={debt.name}
                    value={debt.value}
                    status={debt.status}
                    handleChange={(event) => handleNestedFieldChange(event, index, "debts")}
                    addDebt={() => addCreditDebt(index, "debts")}
                    copyDebt={() => addCreditDebt(index, "debts", true)}
                    removeDebt={() => removeCreditDebt(index, "debts")}
                />
            )
        })
    }
    //Renderização os erros validação
    function renderValidationMsg() {
        return (
            <ValidationMsg className="px-2 mb-3">
                <p>O nome do débito deve ter no mínimo 4 caracteres.</p>
                <p>O valor do débito não pode está em branco.</p>
            </ValidationMsg>
        )
    }

    return (
        <fieldset>
            <legend
                className="text-lg font-medium w-full border-b-2 mb-3 pb-1 px-2
                border-zinc-300"
            >
                {fieldLegend}
            </legend>
            {!formState.validations.debts && renderValidationMsg()}
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-zinc-300">
                        <th className="text-left font-medium pb-3 px-2 whitespace-nowrap">Nome</th>
                        <th className="text-left font-medium pb-3 px-2 whitespace-nowrap">
                            Valor (R$)
                        </th>
                        <th className="text-left font-medium pb-3 px-2 whitespace-nowrap">
                            Status
                        </th>
                        <th className="text-center font-medium pb-3 px-2 whitespace-nowrap">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>{renderRows()}</tbody>
            </table>
        </fieldset>
    )
}
DebtList.propTypes = {
    fieldLegend: propTypes.string,
    debts: propTypes.array,
    readOnly: propTypes.bool
}
