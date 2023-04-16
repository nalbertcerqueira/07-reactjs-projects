import propTypes from "prop-types"
import React from "react"

import { FloatingTag } from "./Tag.jsx"

//Componente Button utilizado em TodoForm.jsx e TodoList.jsx
export default function Button(props) {
    const buttonHidden = props.hide ? "btn--hidden" : ""

    return (
        <button
            role="button"
            aria-label={props.tag}
            onClick={props.onClick}
            className={`group/button ${props.className || ""} ${buttonHidden}`}
            type={props.type}
        >
            {props.children}
            {props.tag && <FloatingTag tag={props.tag} />}
        </button>
    )
}

Button.propTypes = {
    tag: propTypes.string,
    hide: propTypes.bool,
    type: propTypes.string.isRequired,
    children: propTypes.node,
    className: propTypes.string,
    onClick: propTypes.func
}
