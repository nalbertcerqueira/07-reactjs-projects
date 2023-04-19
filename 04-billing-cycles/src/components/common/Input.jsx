import propTypes from "prop-types"

export default function Input(props) {
    return (
        <>
            {props.label && (
                <label
                    className={`block mb-1 font-medium ${props.labelClassName || ""}`}
                    htmlFor={props.id}
                >
                    {props.label}
                </label>
            )}
            <div className="relative">
                <input
                    readOnly={props.readOnly || false}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    value={props.value}
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    autoComplete={props.autoComplete || null}
                    className={`default-input ${props.className || ""}`}
                />
                {props.icon}
            </div>
        </>
    )
}
Input.propTypes = {
    id: propTypes.string,
    name: propTypes.string,
    className: propTypes.string,
    value: propTypes.oneOfType([propTypes.string, propTypes.number]),
    onChange: propTypes.func,
    type: propTypes.string,
    placeholder: propTypes.string,
    readOnly: propTypes.bool,
    autoComplete: propTypes.string,
    label: propTypes.string,
    labelClassName: propTypes.string,
    icon: propTypes.node
}
