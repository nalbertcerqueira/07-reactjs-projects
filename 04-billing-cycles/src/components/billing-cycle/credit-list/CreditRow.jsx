import propTypes from "prop-types"
import { useContext } from "react"

import { FormContext } from "@/src/contexts/providers/FormContext"
import Button from "../../common/Button"
import Input from "../../common/Input"
import AddIcon from "../../icons/bylling-cycle/AddIcon"
import CopyIcon from "../../icons/bylling-cycle/CopyIcon"
import DeleteIcon from "../../icons/bylling-cycle/DeleteIcon"

//Linha de crédito adicionada dinamicamente em CreditList.jsx
export default function CreditRow(props) {
    const { formState } = useContext(FormContext)
    const isNameValid = formState.validations.credits ? true : props.name.length >= 4
    const isValueValid = formState.validations.credits ? true : props.value.length > 0

    return (
        <tr className="animate-[show_0.2s_forwards] border-t border-zinc-300 ">
            <td className="px-2 py-3">
                <Input
                    type="text"
                    name="name"
                    placeholder="Informe o nome"
                    readOnly={props.readOnly}
                    value={props.name}
                    onChange={props.handleChange}
                    id={`${props.id}-credit-name`}
                    className={`credit ${!isNameValid ? "input-invalid" : ""}`}
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
                    id={`${props.id}-credit-value`}
                    className={`credit ${!isValueValid ? "input-invalid" : ""}`}
                />
            </td>
            <td className="flex justify-center gap-2 px-2 py-3">
                <Button
                    disabled={props.readOnly}
                    type="button"
                    className="add-button"
                    onClick={() => {
                        if (!props.readOnly) props.addCredit()
                    }}
                >
                    <AddIcon className="stroke-white" />
                </Button>
                <Button
                    disabled={props.readOnly}
                    className="copy-button"
                    type="button"
                    onClick={() => {
                        if (!props.readOnly) props.copyCredit()
                    }}
                >
                    <CopyIcon className="stroke-white" />
                </Button>
                <Button
                    disabled={props.readOnly}
                    className="delete-button"
                    type="button"
                    onClick={() => {
                        if (!props.readOnly) props.removeCredit()
                    }}
                >
                    <DeleteIcon className="stroke-white" />
                </Button>
            </td>
        </tr>
    )
}
CreditRow.propTypes = {
    id: propTypes.oneOfType([propTypes.number, propTypes.string]),
    value: propTypes.oneOfType([propTypes.string, propTypes.number]),
    name: propTypes.string,
    className: propTypes.string,
    readOnly: propTypes.bool,
    handleChange: propTypes.func,
    addCredit: propTypes.func,
    copyCredit: propTypes.func,
    removeCredit: propTypes.func
}
