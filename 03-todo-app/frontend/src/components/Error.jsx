import propTypes from "prop-types"
import React from "react"

export default function Error(props) {
    return (
        <div className={`${props.className} text-center mt-8 max-w-xl m-auto`}>
            <h2 className="font-bold text-3xl text-neutral-700">Error {props.status}!</h2>
            <p className="text-neutral-500 text-2xl font-semibold">{props.message}</p>
        </div>
    )
}

Error.propTypes = {
    className: propTypes.string,
    status: propTypes.oneOfType([propTypes.string, propTypes.number]),
    message: propTypes.string
}
