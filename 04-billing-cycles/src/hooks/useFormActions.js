import { formatBillingCyclePTBR } from "../utils/client"

//Hook utilizado para expor os métodos dos formulários FormCreate,
//FormUpdate e FormDelete.jsx
export default function useFormActions(dispatch) {
    //Controlando os inputs do formulário
    function handleFieldChange(event) {
        const fieldName = event.target.name
        const fieldValue = event.target.value
        const maskedValue = fieldValue.match(/[0-9]/g)?.join("")

        if (fieldName === "month" || fieldName === "year") {
            dispatch({
                type: "SET_FIELD",
                payload: { fieldName, fieldValue: maskedValue || "" }
            })
        } else {
            dispatch({ type: "SET_FIELD", payload: { fieldName, fieldValue } })
        }
    }
    function handleNestedFieldChange(event, index, type) {
        const fieldName = event.target.name
        const fieldValue = event.target.value

        if (fieldName === "value") {
            const maskedValue = fieldValue.match(/[0-9]/g)
            const formattedValue = Intl.NumberFormat("pt-br", {
                minimumFractionDigits: 2
            }).format(parseFloat((maskedValue?.join("") || 0) / 100))

            dispatch({
                type: "SET_CREDIT_DEBT_FIELD",
                payload: { fieldName, index, type, fieldValue: formattedValue }
            })
        } else {
            dispatch({
                type: "SET_CREDIT_DEBT_FIELD",
                payload: { fieldName, index, type, fieldValue }
            })
        }
    }

    //Validando os inputs do formulário antes do submit
    function validateCredits({ credits }) {
        for (const credit of credits) {
            if (credit.name.length < 4) return false
            if (credit.value.length === 0) return false
        }
        return true
    }
    function validateDebts({ debts }) {
        const validStatus = ["PENDENTE", "PAGO", "AGENDADO"]
        for (const debt of debts) {
            if (debt.name.length < 4) return false
            if (debt.value.length === 0) return false
            if (!validStatus.includes(debt.status)) return false
        }
        return true
    }
    function validateForm(state) {
        const monthInt = parseInt(state.month)
        const yearInt = parseInt(state.year)
        const validation = {
            name: state.name.length >= 4,
            month: monthInt > 0 && monthInt <= 12,
            year: yearInt >= 1970 && yearInt <= 2100,
            credits: validateCredits(state),
            debts: validateDebts(state)
        }
        dispatch({ type: "SET_VALIDATIONS", payload: validation })

        return !Object.values(validation).includes(false)
    }

    //Removendo os erros do formulário
    function clearErrors() {
        const payload = { name: true, month: true, year: true, credits: true, debts: true }
        dispatch({ type: "SET_VALIDATIONS", payload })
    }
    //Resetando o formulário ao estado inicial
    function resetForm() {
        dispatch({ type: "RESET_FORM" })
    }
    //Preenchendo todos os campos do formulário com base em data
    function setAllFields(data) {
        dispatch({ type: "SET_ALL_FIELDS", payload: formatBillingCyclePTBR(data) })
    }

    //Adicionando/removendo linhas de créditos ou débitos do formulário
    function addCreditDebt(index, type, isCopy = false) {
        dispatch({ type: "ADD_CREDIT_DEBT", payload: { index, type, isCopy } })
    }
    function removeCreditDebt(index, type) {
        dispatch({ type: "REMOVE_CREDIT_DEBT", payload: { index, type } })
    }

    return {
        handleNestedFieldChange,
        handleFieldChange,
        validateForm,
        clearErrors,
        resetForm,
        setAllFields,
        addCreditDebt,
        removeCreditDebt
    }
}
