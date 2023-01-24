//Componete Input utilizado em Form.jsx

import propTypes from "prop-types"

export default function Input(props) {
    //Criando estilos estilos personalizados
    const invalidStyle = props.isValid ? "border-gray-400" : "border-red-500"
    const readOnlyStyles = props.readOnly
        ? "bg-gray-100 text-gray-600 focus:border-purple-500 focus:border-gray-400"
        : "focus:border-purple-500 focus:ring-1 focus:ring-purple-500"

    return (
        <div className={`text-lg ${props.classname}`}>
            <label className="block w-full mb-2 font-medium" htmlFor={props.inputId}>
                {props.label}
            </label>
            <input
                onChange={props.onchange}
                className={`block w-full border ${invalidStyle} rounded-md outline-none
                px-4 py-2 transition-all  ${readOnlyStyles}`}
                value={props.value}
                id={props.inputId}
                type={props.type || "text"}
                readOnly={props.readOnly || false}
            />
            {!props.isValid && (
                <span className="text-red-500 text-base">
                    {props.label} não pode ficar em branco
                </span>
            )}
        </div>
    )
}

Input.propTypes = {
    label: propTypes.string.isRequired,
    type: propTypes.string,
    inputId: propTypes.string.isRequired,
    value: propTypes.oneOfType([propTypes.string, propTypes.number]),
    readOnly: propTypes.bool,
    onchange: propTypes.func,
    isValid: propTypes.bool,
    classname: propTypes.string
}
