//Componente Display utilizado em Calculator.jsx

import propTypes from "prop-types"
import React from "react"

import "./Display.css"

export default function Display(props) {
    return (
        <div className="display">
            <input value={props.value} readOnly type="text" name="" id="" />
        </div>
    )
}
Display.propTypes = {
    value: propTypes.oneOfType([propTypes.string, propTypes.number])
}
