import propTypes from "prop-types"

export default function ValidationMsg({ message, className }) {
    return (
        <div
            className={`text-red-500 text-sm animate-[show_0.1s_forwards]
            ${className || ""}`}
        >
            {message}
        </div>
    )
}
ValidationMsg.propTypes = {
    message: propTypes.oneOfType([propTypes.node, propTypes.string]),
    className: propTypes.string
}
