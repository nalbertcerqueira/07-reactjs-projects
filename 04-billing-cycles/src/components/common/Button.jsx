import propTypes from "prop-types"

export default function Button(props) {
    if (!props.optionalHandler) {
        return (
            <button
                disabled={props.disabled}
                className={props.className}
                onClick={props.onClick}
                type={props.type}
            >
                {props.children}
            </button>
        )
    }

    //caso o retorno da função seja verdadeiro (formulário válido), então
    //o botão de limpar não aparece
    if (props.optionalHandler() === true) {
        return false
    } else {
        return (
            <button
                disabled={props.disabled}
                className={props.className}
                onClick={props.onClick}
                type={props.type}
            >
                {props.children}
            </button>
        )
    }
}
Button.propTypes = {
    disabled: propTypes.bool,
    children: propTypes.node,
    onClick: propTypes.func,
    type: propTypes.string,
    className: propTypes.string,
    optionalHandler: propTypes.func
}
