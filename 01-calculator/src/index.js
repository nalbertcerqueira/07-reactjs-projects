import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import Title from "./components/title/Title.jsx"
import Calculator from "./main/Calculator.jsx"

import "./index.css"

/*Montando a aplicação no DOM*/
const root = ReactDOM.createRoot(document.querySelector(".root"))
root.render(
    <StrictMode>
        <Title title="Calculator" />
        <Calculator />
    </StrictMode>
)
