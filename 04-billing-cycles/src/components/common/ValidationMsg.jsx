import propTypes from "prop-types"
import { Fragment } from "react"

export default function ValidationMsg({ message, children, className }) {
    const randomKey = Math.floor(Math.random() * 100000)
    return (
        <div
            aria-atomic="true"
            aria-live="polite"
            className={`text-red-500 text-sm animate-[show_0.1s_forwards] ${className || ""}`}
        >
            <Fragment key={randomKey}>{message || children}</Fragment>
        </div>
    )
}
ValidationMsg.propTypes = {
    message: propTypes.string,
    className: propTypes.string,
    children: propTypes.node
}
