/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from "prop-types"
import { useContext } from "react"

import { Context as FormsContext } from "../../../contexts/FormsContext"
import ValidationMsg from "../../common/ValidationMsg"
import DebtRow from "./DebtRow"

//Lista de débitos que cotém inputs que serão adicionados
//dinamicamente nos formulários FormCreate, FormUpdate e FormDelete.jsx
export default function DebtList({ fieldLegend, data, readOnly }) {
    const { flags } = useContext(FormsContext)
    const debts = data.data

    function renderRows() {
        return debts.map((debt, index) => {
            return (
                <DebtRow
                    datasetId={debt.id}
                    key={debt?.id || index}
                    id={debt?.id || index}
                    readOnly={readOnly}
                    name={debts[index].name}
                    value={`${debts[index].value}`}
                    status={debts[index].status}
                    changeName={(event) => data.changeName(index, "debt", event)}
                    changeValue={(event) => data.changeValue(index, "debt", event)}
                    changeStatus={(event) => data.changeStatus(index, event)}
                    addNewDebt={() => data.add(index, "debt")}
                    copyDebt={() => data.add(index, "debt", true)}
                    removeDebt={() => data.remove(index, "debt")}
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
                        <div>O nome do débito deve ter no mínimo 4 caracteres.</div>
                        <div>O valor do débito não pode está em branco.</div>
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
            {!flags.debts && renderValidationMsg()}
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-zinc-300">
                        <th className="text-left font-medium pb-3 px-2 whitespace-nowrap">
                            Nome
                        </th>
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
    data: propTypes.object,
    readOnly: propTypes.bool
}
