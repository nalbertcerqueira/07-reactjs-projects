import propTypes from "prop-types"
import { useContext } from "react"

import { FormContext } from "@/src/contexts/providers/FormContext"
import useFormActions from "@/src/hooks/useFormActions"
import ValidationMsg from "../../common/ValidationMsg"
import CreditRow from "./CreditRow"

//Lista de créditos com inputs que serão adicionados dinamicamente
//aos formulários FormCreate, FormUpdate e FormDelete.jsx
export default function CreditList({ fieldLegend, credits, readOnly = false }) {
    const { formState, formDispatch } = useContext(FormContext)
    const { handleNestedFieldChange, addCreditDebt, removeCreditDebt } =
        useFormActions(formDispatch)

    //Renderizando cada linha da tabela
    function renderRows() {
        return credits.map((credit, index) => {
            return (
                <CreditRow
                    key={credit?.id || index}
                    id={credit?.id || index}
                    readOnly={readOnly}
                    name={credit.name}
                    value={credit.value}
                    handleChange={(event) => handleNestedFieldChange(event, index, "credits")}
                    addCredit={() => addCreditDebt(index, "credits")}
                    copyCredit={() => addCreditDebt(index, "credits", true)}
                    removeCredit={() => removeCreditDebt(index, "credits")}
                />
            )
        })
    }
    //Renderização os erros validação
    function renderValidationMsg() {
        return (
            <ValidationMsg className="px-2 mb-3">
                <div>O nome do crédito deve ter no mínimo 4 caracteres.</div>
                <div>O valor do crédito não pode está em branco.</div>
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
            {!formState.validations.credits && renderValidationMsg()}
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-zinc-300">
                        <th className="text-left font-medium pb-3 px-2 whitespace-nowrap">Nome</th>
                        <th className="text-left font-medium pb-3 px-2 whitespace-nowrap">
                            Valor (R$)
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
CreditList.propTypes = {
    fieldLegend: propTypes.string,
    credits: propTypes.array,
    readOnly: propTypes.bool
}
