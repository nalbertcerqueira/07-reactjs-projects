import propTypes from "prop-types"
import React from "react"

//Componente utilizado em Button.jsx
export function FloatingTag(props) {
    return <span className={`button-tag ${props.className || ""}`}>{props.tag}</span>
}
FloatingTag.propTypes = {
    tag: propTypes.node,
    className: propTypes.string
}
