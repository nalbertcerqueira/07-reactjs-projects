import propTypes from "prop-types"
import { useContext } from "react"

import { FormContext } from "@/src/contexts/providers/FormContext"
import Button from "../../common/Button"
import Input from "../../common/Input"
import AddIcon from "../../icons/bylling-cycle/AddIcon"
import CopyIcon from "../../icons/bylling-cycle/CopyIcon"
import DeleteIcon from "../../icons/bylling-cycle/DeleteIcon"

//Linha de débito adicionada dinamicamente em DebtList.jsx
export default function DebtRow(props) {
    const { formState } = useContext(FormContext)
    const isNameValid = formState.validations.debts ? true : props.name.length >= 4
    const isValueValid = formState.validations.debts ? true : props.value.length > 0

    return (
        <tr className="animate-[show_0.2s_forwards] border-t border-zinc-300 ">
            <td className="px-2 py-3">
                <Input
                    type="text"
                    name="name"
                    placeholder="Informe o nome"
                    autoComplete="off"
                    readOnly={props.readOnly}
                    value={props.name}
                    onChange={props.handleChange}
                    id={`${props.id}-debt-name`}
                    className={`debt ${!isNameValid ? "input-invalid" : ""}`}
                />
            </td>
            <td className="px-2 py-3">
                <Input
                    type="tel"
                    name="value"
                    placeholder="Informe o valor"
                    autoComplete="transaction-amount"
                    readOnly={props.readOnly}
                    value={props.value}
                    onChange={props.handleChange}
                    id={`${props.id}-debt-value`}
                    className={`debt ${!isValueValid ? "input-invalid" : ""}`}
                />
            </td>
            <td className="px-2 py-3">
                <select
                    name="status"
                    value={props.status}
                    disabled={props.readOnly}
                    className="default-select"
                    id={`${props.id}-debt-status`}
                    onChange={props.handleChange}
                >
                    <option value="PENDENTE">PENDENTE</option>
                    <option value="PAGO">PAGO</option>
                    <option value="AGENDADO">AGENDADO</option>
                </select>
            </td>
            <td className="flex justify-center gap-2 px-2 py-3">
                <Button
                    className="add-button"
                    type="button"
                    onClick={() => {
                        if (!props.readOnly) props.addDebt()
                    }}
                >
                    <AddIcon className="stroke-white" />
                </Button>
                <Button
                    className="copy-button"
                    type="button"
                    onClick={() => {
                        if (!props.readOnly) props.copyDebt()
                    }}
                >
                    <CopyIcon className="stroke-white" />
                </Button>
                <Button
                    className="delete-button"
                    type="button"
                    onClick={() => {
                        if (!props.readOnly) props.removeDebt()
                    }}
                >
                    <DeleteIcon className="stroke-white" />
                </Button>
            </td>
        </tr>
    )
}
DebtRow.propTypes = {
    id: propTypes.oneOfType([propTypes.number, propTypes.string]),
    value: propTypes.oneOfType([propTypes.string, propTypes.number]),
    name: propTypes.string,
    status: propTypes.string,
    className: propTypes.string,
    readOnly: propTypes.bool,
    handleChange: propTypes.func,
    addDebt: propTypes.func,
    copyDebt: propTypes.func,
    removeDebt: propTypes.func
}
