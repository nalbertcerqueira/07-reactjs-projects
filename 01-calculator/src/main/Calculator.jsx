/*Componente principal*/
import React, { useCallback, useState } from "react"

import Button from "../components/button/Button.jsx"
import Display from "../components/display/Display.jsx"
import Macbar from "../components/macos-bar/Macbar.jsx"
import "./Calculator.css"

/*Memorizando componentes que não dependem do estado*/
const MemoMacbar = React.memo(Macbar)
const MemoButton = React.memo(Button)

/*Declarando o estado inicial da aplicação*/
const initialState = {
    display: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default function Calculator() {
    const [state, setState] = useState({
        display: "0",
        clearDisplay: false,
        operation: null,
        values: [0, 0],
        current: 0
    })

    // Zerando/limpando o estado da calculadora
    const clearDisplay = useCallback(() => {
        setState({ ...initialState, values: [...initialState.values] })
    }, [])

    // Adicionando dígitos ao display
    function addDigit(digit) {
        if (digit === "." && state.display.includes(digit)) return

        const clearDisplay = state.display === "0" || state.clearDisplay
        const currentValue = clearDisplay ? "" : state.display
        const displayValue = currentValue + digit
        let values = [...state.values]

        if (digit !== ".") {
            const i = state.current
            const newValue = parseFloat(displayValue)
            values[i] = newValue
        }

        setState({
            ...state,
            values: [...values],
            display: displayValue,
            clearDisplay: false
        })
    }

    // Adicionando operadores ao estado da calculadora
    function setOperation(operation) {
        if (state.current === 0) {
            setState({
                ...state,
                current: 1,
                operation,
                display: "",
                clearDisplay: true
            })
        } else {
            const equals = operation === "="
            const currentOperation = state.operation
            const values = [...state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (error) {
                values[0] = state.values[0]
            }
            values[1] = 0
            setState({
                ...state,
                values: [...values],
                display: values[0],
                clearDisplay: !equals,
                operation: equals ? null : operation,
                current: equals ? 0 : 1
            })
        }
    }

    return (
        <div className="calculator">
            <MemoMacbar />
            <Display value={state.display} />
            <div className="buttons-wrapper">
                <MemoButton onclick={clearDisplay} id="ac-button" label="AC" />
                <Button onclick={setOperation} class="op-button" label="/" />
                <Button onclick={addDigit} class="number" label="7" />
                <Button onclick={addDigit} class="number" label="8" />
                <Button onclick={addDigit} class="number" label="9" />
                <Button onclick={setOperation} class="op-button" label="*" />
                <Button onclick={addDigit} class="number" label="4" />
                <Button onclick={addDigit} class="number" label="5" />
                <Button onclick={addDigit} class="number" label="6" />
                <Button onclick={setOperation} class="op-button" label="-" />
                <Button onclick={addDigit} class="number" label="1" />
                <Button onclick={addDigit} class="number" label="2" />
                <Button onclick={addDigit} class="number" label="3" />
                <Button onclick={setOperation} class="op-button" label="+" />
                <Button onclick={addDigit} class="number" id="zero-button" label="0" />
                <Button onclick={addDigit} class="dot-number" id="dot-button" label="." />
                <Button onclick={setOperation} class="op-button" id="equal-button" label="=" />
            </div>
        </div>
    )
}
