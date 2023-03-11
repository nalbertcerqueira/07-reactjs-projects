/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from "prop-types"
import { useContext, useEffect, useState } from "react"

import { Context as FormsContext } from "../../../contexts/FormsContext"
import Button from "../../common/Button"
import Input from "../../common/Input"
import AddIcon from "../../icons/bylling-cycle/AddIcon"
import CopyIcon from "../../icons/bylling-cycle/CopyIcon"
import DeleteIcon from "../../icons/bylling-cycle/DeleteIcon"

//Linha de crédito adicionada dinamicamente em CreditList.jsx
export default function CreditRow(props) {
    const [rowFlags, setFlags] = useState({ name: true, value: true })
    const { flags } = useContext(FormsContext)

    useEffect(() => {
        setFlags({ name: props.name.length >= 4, value: props.value.length > 0 })
    }, [flags])

    return (
        <tr className="animate-[show_0.2s_forwards] border-t border-zinc-300 ">
            <td className="px-2 py-3">
                <Input
                    type="text"
                    placeholder="Informe o nome"
                    readOnly={props.readOnly}
                    value={props.name}
                    onChange={props.changeName}
                    datasetId={props.datasetId}
                    id={`${props.id}-credit-name`}
                    name={`${props.id}-credit-name`}
                    className={`credit ${
                        !rowFlags.name && !flags.credits ? "input-invalid" : ""
                    }`}
                />
            </td>
            <td className="px-2 py-3">
                <Input
                    type="tel"
                    placeholder="Informe o valor"
                    autoComplete="transaction-amount"
                    readOnly={props.readOnly}
                    value={props.value}
                    onChange={props.changeValue}
                    datasetId={props.datasetId}
                    id={`${props.id}-credit-value`}
                    name={`${props.id}-credit-value`}
                    className={`credit ${
                        !rowFlags.value && !flags.credits ? "input-invalid" : ""
                    }`}
                />
            </td>
            <td className="flex justify-center gap-2 px-2 py-3">
                <Button
                    type="button"
                    className="add-button"
                    onClick={() => {
                        if (!props.readOnly) props.addNewCredit()
                    }}
                >
                    <AddIcon className="stroke-white" />
                </Button>
                <Button
                    className="copy-button"
                    type="button"
                    onClick={() => {
                        if (!props.readOnly) props.copyCredit()
                    }}
                >
                    <CopyIcon className="stroke-white" />
                </Button>
                <Button
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
    datasetId: propTypes.any,
    changeName: propTypes.func,
    changeValue: propTypes.func,
    addNewCredit: propTypes.func,
    copyCredit: propTypes.func,
    removeCredit: propTypes.func
}
