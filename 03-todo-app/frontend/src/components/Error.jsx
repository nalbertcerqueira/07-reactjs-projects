import propTypes from "prop-types"
import React from "react"

export default function Error(props) {
    return (
        <div className="error-container">
            <h2 className="error-container__title">Error {props.status}!</h2>
            <p className="error-container__msg">{props.message}</p>
        </div>
    )
}

Error.propTypes = {
    status: propTypes.oneOfType([propTypes.string, propTypes.number]),
    message: propTypes.string
}
