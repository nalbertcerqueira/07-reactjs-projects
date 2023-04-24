import propTypes from "prop-types"
import React, { createContext, useState } from "react"

export const FormContext = createContext(null)

//Contexto utilizado em App.jsx
export default function FormProvider({ children }) {
    const [taskInput, setTaskInput] = useState("")
    const [isInputValid, setIsInputValid] = useState(true)
    const [filterTag, setFilterTag] = useState(null)

    //Controlando o input do formulário (TodoForm.jsx)
    function handleTaskInput(event) {
        setTaskInput(event.target.value)
        setIsInputValid((prevState) => (!prevState ? true : prevState))
    }

    //Removendo a tag de filtro
    function closeFilterTag() {
        setFilterTag(null)
        setTaskInput("")
    }

    //Exibindo a tag de filtro
    function showFilterTag() {
        setFilterTag(taskInput)
    }

    //Resetando o formulário ao estado inicial
    function resetForm() {
        setTaskInput("")
        setFilterTag(null)
    }

    return (
        <FormContext.Provider
            value={{
                taskInput,
                isInputValid,
                filterTag,
                methods: {
                    handleTaskInput,
                    closeFilterTag,
                    showFilterTag,
                    setIsInputValid,
                    resetForm
                }
            }}
        >
            {children}
        </FormContext.Provider>
    )
}
FormProvider.propTypes = {
    children: propTypes.node
}
