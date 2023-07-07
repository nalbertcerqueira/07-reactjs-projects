import propTypes from "prop-types"

export default function ValidationMsg({ message, children, className }) {
    return (
        <div className={`text-red-500 text-sm animate-[show_0.1s_forwards] ${className || ""}`}>
            {message || children}
        </div>
    )
}
ValidationMsg.propTypes = {
    message: propTypes.string,
    className: propTypes.string,
    children: propTypes.node
}
