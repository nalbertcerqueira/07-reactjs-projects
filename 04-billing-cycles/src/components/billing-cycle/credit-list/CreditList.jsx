/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from "prop-types"
import { useContext } from "react"

import { Context as FormsContext } from "../../../contexts/FormsContext"
import ValidationMsg from "../../common/ValidationMsg"
import CreditRow from "./CreditRow"

//Lista de créditos contendo inputs que serão adicionados
//dinamicamente nos formulários FormCreate, FormUpdate e FormDelete.jsx
export default function CreditList({ fieldLegend, data, readOnly }) {
    const { flags } = useContext(FormsContext)
    const credits = data.data

    function renderRows() {
        return credits.map((credit, index) => {
            return (
                <CreditRow
                    datasetId={credit.id}
                    key={credit?.id || index}
                    id={credit?.id || index}
                    readOnly={readOnly}
                    name={credits[index].name}
                    value={`${credits[index].value}`}
                    changeName={(event) => data.changeName(index, "credit", event)}
                    changeValue={(event) => data.changeValue(index, "credit", event)}
                    addNewCredit={() => data.add(index, "credit")}
                    copyCredit={() => data.add(index, "credit", true)}
                    removeCredit={() => data.remove(index, "credit")}
                />
            )
        })
    }
    function renderValidationMsg() {
        return (
            <ValidationMsg
                className="px-2 mb-3"
                message={
                    <>
                        <div>O nome do crédito deve ter no mínimo 4 caracteres.</div>
                        <div>O valor do crédito não pode está em branco.</div>
                    </>
                }
            />
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
            {!flags.credits && renderValidationMsg()}
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-zinc-300">
                        <th className="text-left font-medium pb-3 px-2 whitespace-nowrap">
                            Nome
                        </th>
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
    data: propTypes.object,
    readOnly: propTypes.bool
}
