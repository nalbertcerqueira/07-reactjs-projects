/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from "prop-types"
import { useContext, useEffect, useState } from "react"

import { Context as FormsContext } from "../../../contexts/FormsContext"
import Button from "../../common/Button"
import Input from "../../common/Input"
import AddIcon from "../../icons/bylling-cycle/AddIcon"
import CopyIcon from "../../icons/bylling-cycle/CopyIcon"
import DeleteIcon from "../../icons/bylling-cycle/DeleteIcon"

//Linha de débito adicionada dinamicamente em DebtList.jsx
export default function DebtRow(props) {
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
                    id={`${props.id}-debt-name`}
                    name={`${props.id}-debt-name`}
                    className={`debt ${!rowFlags.name && !flags.debts ? "input-invalid" : ""}`}
                />
            </td>
            <td className="px-2 py-3">
                <Input
                    type="text"
                    placeholder="Informe o valor"
                    autoComplete="transaction-amount"
                    readOnly={props.readOnly}
                    value={props.value}
                    onChange={props.changeValue}
                    datasetId={props.datasetId}
                    id={`${props.id}-debt-value`}
                    name={`${props.id}-debt-value`}
                    className={`debt ${
                        !rowFlags.value && !flags.debts ? "input-invalid" : ""
                    }`}
                />
            </td>
            <td className="px-2 py-3">
                <select
                    value={props.status}
                    disabled={props.readOnly}
                    className="default-select"
                    name={`${props.id}-debt-status`}
                    id={`${props.id}-debt-status`}
                    onChange={props.changeStatus}
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
                        if (!props.readOnly) props.addNewDebt()
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
    datasetId: propTypes.any,
    changeName: propTypes.func,
    changeValue: propTypes.func,
    changeStatus: propTypes.func,
    addNewDebt: propTypes.func,
    copyDebt: propTypes.func,
    removeDebt: propTypes.func
}
