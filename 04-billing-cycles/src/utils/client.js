import { toast } from "react-toastify"

//Emitindo um toast em caso de suscesso ou falha
export function toastEmmitter({ message, success, id }) {
    if (success) {
        return toast.success(message, { toastId: id || "success", autoClose: 3000 })
    } else {
        return toast.error(message, { toastId: id || "failed", autoClose: 3000 })
    }
}
//Copiando um objeto de forma profunda
export function copyData(data) {
    return JSON.parse(JSON.stringify(data))
}

//Formatando um valor de crédito ou débito para o padrão 0.00
export function fomartValueISO(value) {
    return parseFloat(value.replace(/[.,]/g, "") / 100)
}
//Formatando um valor de crédito ou débito para o padrão 0.000,00
export function formatValuePTBR(value) {
    const options = { minimumFractionDigits: 2 }
    return Intl.NumberFormat("pt-br", options).format(parseFloat(value))
}

//Formatando todos os valores de créditos ou débitos de um cíclo
//de pagamentos para o padrão ISO ou PTBR
export function formatBillingCycleISO(data) {
    const dataCopy = copyData(data)
    return dataCopy.map((object) => {
        object.value = fomartValueISO(object.value)
        return object
    })
}

export function formatBillingCyclePTBR(billingCyle) {
    const dataCopy = copyData(billingCyle)

    dataCopy.credits = dataCopy.credits.map((credit) => {
        credit.value = formatValuePTBR(credit.value)
        return credit
    })
    dataCopy.debts = dataCopy.debts.map((debt) => {
        debt.value = formatValuePTBR(debt.value)
        return debt
    })

    return dataCopy
}

//Calculando o somatório de créditos e débitos de um cíclo de pagamentos
export function calculateSummary({ credits, debts }) {
    const creditsISO = formatBillingCycleISO(credits)
    const debtsISO = formatBillingCycleISO(debts)
    const crediSum = creditsISO.reduce((acc, credit) => (acc += credit.value), 0)
    const debtSum = debtsISO.reduce((acc, debt) => (acc += debt.value), 0)
    return {
        credit: crediSum,
        debt: debtSum,
        balance: crediSum - debtSum
    }
}
