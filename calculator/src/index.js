import React from "react"
import ReactDOM from "react-dom/client"
import Calculator from "./main/Calculator.jsx"

import "./index.css"

/*Montando a aplicação no DOM*/
const root = ReactDOM.createRoot(document.querySelector(".root"))
root.render(
    <React.Fragment>
        <h1>Calculator</h1>
        <Calculator />
    </React.Fragment>
)
