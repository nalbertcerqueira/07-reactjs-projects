//Componete Input utilizado em Form.jsx

import propTypes from "prop-types"

export default function Input(props) {
    //Criando estilos diferentes para componentes readonly
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
                className={`block w-full border border-gray-400 rounded-md outline-none
                px-4 py-2 transition-all ${readOnlyStyles}`}
                value={props.value}
                id={props.inputId}
                type={props.type || "text"}
                readOnly={props.readOnly || false}
            />
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
    classname: propTypes.string
}
