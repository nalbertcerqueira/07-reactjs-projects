import propTypes from "prop-types"
import { createContext, useReducer } from "react"
import { formInitialState, formReducer } from "../../store/form/config"

export const FormContext = createContext(null)

//Contexto utilizado nos formulários de FormCreate, FormUpdate e FormDelete.jsx
export default function FormProvider({ children }) {
    const [formState, formDispatch] = useReducer(formReducer, formInitialState)

    return (
        <FormContext.Provider value={{ formState, formDispatch }}>{children}</FormContext.Provider>
    )
}
FormProvider.propTypes = {
    children: propTypes.node
}
