import { formInitialState } from "./formInitialState"

export default function formReducer(state, { type, payload }) {
    switch (type) {
        case "SET_FIELD": {
            return { ...state, [payload.fieldName]: payload.fieldValue }
        }
        case "SET_ALL_FIELDS": {
            return { ...state, ...payload, validations: formInitialState.validations }
        }
        case "SET_VALIDATIONS": {
            return { ...state, validations: { ...payload } }
        }
        case "RESET_FORM": {
            return formInitialState
        }
        default: {
            return creditDebtReducer(state, { type, payload })
        }
    }
}

function creditDebtReducer(state, { type, payload }) {
    switch (type) {
        case "SET_CREDIT_DEBT_FIELD": {
            const { type: transactionType, index, fieldName, fieldValue } = payload
            return {
                ...state,
                [transactionType]: state[transactionType].map((transaction, i) => {
                    if (index === i) {
                        return { ...transaction, [fieldName]: fieldValue }
                    } else {
                        return transaction
                    }
                })
            }
        }
        case "ADD_CREDIT_DEBT": {
            const { type: transactionType, index, isCopy } = payload

            const newLine = isCopy
                ? { ...state[transactionType][index], id: "" }
                : formInitialState[transactionType][0]

            const firstHalf = state[transactionType].slice(0, index + 1).concat(newLine)
            const secondHalf = state[transactionType].slice(index + 1)
            return { ...state, [transactionType]: firstHalf.concat(secondHalf) }
        }
        case "REMOVE_CREDIT_DEBT": {
            const { type: transactionType, index } = payload

            if (state[transactionType].length < 2) return state
            return {
                ...state,
                [transactionType]: state[transactionType].filter((transaction, i) => {
                    return i !== index
                })
            }
        }
        default: {
            return state
        }
    }
}
