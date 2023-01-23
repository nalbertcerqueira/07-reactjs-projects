import propTypes from "prop-types"
import React from "react"

import "./Title.css"

export default function Title(props) {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

Title.propTypes = {
    title: propTypes.string
}
