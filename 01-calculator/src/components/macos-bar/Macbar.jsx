//Componente Macbar utilizado em Calculator.jsx

import React from "react"
import "./Macbar.css"

export default function Macbar() {
    return (
        <div className="macos-bar">
            <span className="close-option"></span>
            <span className="minimize-option"></span>
            <span className="zoom-control"></span>
        </div>
    )
}
