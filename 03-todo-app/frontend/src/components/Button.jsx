import propTypes from "prop-types"
import React from "react"

import { FloatingTag } from "./Tag.jsx"

//Componente Button utilizado em TodoForm.jsx e TodoList.jsx
export default function Button(props) {
    const buttonHidden = props.hide ? "hidden" : ""
    const buttonColors = {
        blue: "bg-sky-600 ring-2 ring-sky-600 hover:bg-sky-800 hover:ring-sky-800 focus:ring-sky-600 focus:bg-sky-800",
        red: "bg-red-600 ring-2 ring-red-600 hover:bg-red-800 hover:ring-red-800 focus:ring-red-600 focus:bg-red-800",
        green: "bg-green-600 ring-2 ring-green-600 hover:bg-green-800 hover:ring-green-800 focus:ring-green-600 focus:bg-green-800",
        yellow: "bg-yellow-600 ring-2 ring-yellow-600 hover:bg-yellow-800 hover:ring-yellow-800 focus:ring-yellow-600 focus:bg-yellow-800",
        cyan: "bg-cyan-500 ring-2 ring-cyan-500 hover:bg-cyan-700 hover:ring-cyan-700 focus:ring-cyan-500 focus:bg-cyan-700"
    }

    return (
        <button
            aria-label={props.tag}
            onClick={props.onClick}
            className={`relative group/button ${props.className || ""} ${buttonHidden} ${
                buttonColors[props.color] || ""
            }`}
            type={props.type}
        >
            {props.children}
            <FloatingTag tag={props.tag} />
        </button>
    )
}

Button.propTypes = {
    tag: propTypes.string,
    hide: propTypes.bool,
    type: propTypes.string.isRequired,
    children: propTypes.node,
    className: propTypes.string,
    onClick: propTypes.func,
    color: propTypes.oneOf(["blue", "red", "green", "yellow", "cyan"])
}
