import propTypes from "prop-types"
import { createContext, useCallback, useState } from "react"

import { copyData } from "../utils/client"

const initialStates = {
    credit: [{ name: "", value: "0.00", id: "" }],
    debt: [{ name: "", value: "0.00", status: "PENDENTE", id: "" }],
    summary: { credit: 0, debt: 0, balance: 0 },
    flags: { name: true, month: true, year: true, credits: true, debts: true }
}

const initialContext = {
    id: "",
    name: "",
    month: "",
    year: "",
    summary: {},
    flags: {},
    methods: {
        changeName: () => {},
        changeMonth: () => {},
        changeYear: () => {},
        changeSummary: () => {},
        setAllData: () => {},
        validateAllForm: () => {},
        isFormValid: () => {},
        clearAllErrors: () => {},
        resetForm: () => {}
    },

    creditList: {
        data: [],
        isValid: true,
        changeName: () => {},
        changeValue: () => {},
        add: () => {},
        remove: () => {}
    },

    debtList: {
        data: [],
        isValid: true,
        changeName: () => {},
        changeValue: () => {},
        changeStatus: () => {},
        add: () => {},
        remove: () => {}
    }
}

//Contexto utilizado nos formulários dinâmicos nas abas de cadastro e edição
//de cíclos de pagamentos
export const Context = createContext(initialContext)
export default function FormsContext({ children }) {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [summary, setSummary] = useState(initialStates.summary)
    const [flags, setFlags] = useState(initialStates.flags)

    const [creditList, setCreditList] = useState(initialStates.credit)
    const [debtList, setDebtList] = useState(initialStates.debt)

    //Preenchendo os campos do formulário com base nos dados passados no argumento
    function setAllData(data) {
        ;[setId(data.id), setName(data.name), setMonth(data.month), setYear(data.year)]
        ;[setCreditList(data.credits), setDebtList(data.debts)]
    }

    //Função utilizada para controlar os inputs de nome, mes e ano
    //de um cíclo de pagamentos
    function changeName(event) {
        return setName(event.target.value)
    }
    const changeMonth = (event) => {
        const maskInput = event.target.value.match(/[0-9]/g)
        return maskInput ? setMonth(maskInput.join("")) : setMonth("")
    }
    const changeYear = (event) => {
        const maskInput = event.target.value.match(/[0-9]/g)
        return maskInput ? setYear(maskInput.join("")) : setYear("")
    }

    //Funções utilizadas para controlar os inputs de nome, valor e status
    //dos créditos e débitos de um determinado cpiclo de pagamentos
    function changeCreditDebtName(index, type, event) {
        const dataTypes = { credit: creditList, debt: debtList }
        const handler = { credit: setCreditList, debt: setDebtList }

        const dataCopy = copyData(dataTypes[type])
        const name = event.target.value
        dataCopy[index].name = name

        handler[type](dataCopy)
    }
    function changeCreditDebtValue(index, type, event) {
        const dataTypes = { credit: creditList, debt: debtList }
        const handler = { credit: setCreditList, debt: setDebtList }

        const dataCopy = copyData(dataTypes[type])
        const value = event.target.value
        const maskValue = value.match(/[0-9]/g)
        const formatedValue = Intl.NumberFormat("pt-br", { minimumFractionDigits: 2 }).format(
            parseFloat((maskValue ? maskValue.join("") : 0) / 100)
        )

        dataCopy[index].value = formatedValue
        handler[type](dataCopy)
    }
    function changeDebtStatus(index, event) {
        const dataCopy = copyData(debtList)
        const status = event.target.value
        dataCopy[index].status = status
        setDebtList(dataCopy)
    }

    //Adicionando/removendo uma linha de crédito ou débito nos formulários dinâmicos.
    //useCallback pois esta função será passada para varios botões nos formulários dinâmicos
    //de cadastro e edição de cíclo de pagamentos
    const removeCreditDebt = useCallback(
        (index, type) => {
            const dataTypes = { credit: creditList, debt: debtList }
            const handler = { credit: setCreditList, debt: setDebtList }
            if (dataTypes[type].length < 2) return dataTypes[type]

            const dataCopy = copyData(dataTypes[type])
            const newData = dataCopy.filter((type, i) => {
                return i !== index
            })
            handler[type](newData)
        },
        [creditList, debtList]
    )
    const addCreditDebt = useCallback(
        (index, type, isCopy = false) => {
            const defaultState = initialStates[type]
            const dataTypes = { credit: creditList, debt: debtList }
            const handler = { credit: setCreditList, debt: setDebtList }

            const dataCopy = copyData(dataTypes[type])
            let newItem = {}
            if (type === "debt") {
                newItem = isCopy
                    ? {
                          name: dataCopy[index].name,
                          value: dataCopy[index].value,
                          status: dataCopy[index].status,
                          id: ""
                      }
                    : defaultState[0]
            } else {
                newItem = isCopy
                    ? { name: dataCopy[index].name, value: dataCopy[index].value, id: "" }
                    : defaultState[0]
            }

            const removedData = dataCopy.splice(0, index + 1, newItem)
            const newData = removedData.concat(dataCopy)
            handler[type](newData)
        },
        [creditList, debtList]
    )

    //Validando todos os campos dos formulários antes do submit
    function validateCredit() {
        for (const credit of creditList) {
            if (credit.name.length < 4) return false
            if (credit.value.length === 0) return false
        }
        return true
    }
    function validateDebt() {
        const validStatus = ["PENDENTE", "PAGO", "AGENDADO"]
        for (const debt of debtList) {
            if (debt.name.length < 4) return false
            if (debt.value.length === 0) return false
            if (!validStatus.includes(debt.status)) return false
        }
        return true
    }
    function validateAllForm() {
        const monthInt = parseInt(month)
        const yearInt = parseInt(year)
        const newFlagsState = {
            name: name.length >= 4,
            month: monthInt > 0 && monthInt <= 12,
            year: yearInt >= 1970 && yearInt <= 2100,
            credits: validateCredit(),
            debts: validateDebt()
        }
        setFlags(newFlagsState)

        return !Object.values(newFlagsState).includes(false)
    }
    function isFormValid() {
        return !Object.values(flags).includes(false)
    }

    //Limpando os erros do formulário
    function clearAllErrors() {
        setFlags(initialStates.flags)
    }
    //Resetando o formulário ao estado inicial
    function resetForm() {
        ;[setId(""), setName(""), setMonth(""), setYear("")]
        ;[setCreditList(initialStates.credit), setDebtList(initialStates.debt)]
        clearAllErrors()
    }

    return (
        <Context.Provider
            value={{
                id,
                name,
                month,
                year,
                summary,
                flags,
                methods: {
                    changeName,
                    changeMonth,
                    changeYear,
                    changeSummary: setSummary,
                    setAllData,
                    validateAllForm,
                    isFormValid,
                    clearAllErrors,
                    resetForm
                },
                creditList: {
                    data: creditList,
                    changeName: changeCreditDebtName,
                    changeValue: changeCreditDebtValue,
                    add: addCreditDebt,
                    remove: removeCreditDebt
                },
                debtList: {
                    data: debtList,
                    changeName: changeCreditDebtName,
                    changeValue: changeCreditDebtValue,
                    changeStatus: changeDebtStatus,
                    add: addCreditDebt,
                    remove: removeCreditDebt
                }
            }}
        >
            {children}
        </Context.Provider>
    )
}
FormsContext.propTypes = {
    children: propTypes.node
}
