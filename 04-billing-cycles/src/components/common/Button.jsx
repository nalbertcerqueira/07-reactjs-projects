import propTypes from "prop-types"

export default function Button(props) {
    if (props.isFormValid) return null
    return (
        <button
            aria-label={props.ariaLabel || null}
            disabled={props.disabled}
            className={props.className}
            onClick={props.onClick}
            type={props.type}
        >
            {props.children}
        </button>
    )
}
Button.propTypes = {
    ariaLabel: propTypes.string,
    disabled: propTypes.bool,
    children: propTypes.node,
    onClick: propTypes.func,
    type: propTypes.string,
    className: propTypes.string,
    isFormValid: propTypes.bool
}
