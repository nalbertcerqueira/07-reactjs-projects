import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./main/App.jsx"

import "./global.css"

//Criando a raiz e renderizando a aplicação no DOM
const root = ReactDOM.createRoot(document.querySelector(".root"))
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
