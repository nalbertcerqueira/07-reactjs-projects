//Componente Button utilizado em Calculator.jsx
import propTypes from "prop-types"
import React from "react"

import "./Button.css"

export default function Button(props) {
    return (
        <button
            onClick={() => {
                props.onclick(props.label)
            }}
            id={props.id}
            className={props.class}
        >
            {props.label}
        </button>
    )
}
Button.propTypes = {
    label: propTypes.node,
    class: propTypes.string,
    id: propTypes.string,
    onclick: propTypes.func
}
