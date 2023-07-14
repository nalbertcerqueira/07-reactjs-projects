import { toast } from "react-toastify"

//Emitindo um toast em caso de sucesso ou falha
export function toastEmmitter({ message, success, id }) {
    if (success) {
        return toast.success(message, { toastId: id || "success", autoClose: 3000 })
    } else {
        return toast.error(message, { toastId: id || "failed", autoClose: 3000 })
    }
}
//Convertendo valores monetários para R$
export function convertCurrency(value, locale = "pt-br", currency = "BRL") {
    return value.toLocaleString(locale, {
        style: "currency",
        currency
    })
}

//Formatando um valor de crédito ou débito para number
export function formatValueISO(value) {
    return parseFloat(value.replace(/[.,]/g, "") / 100)
}
//Formatando um valor de crédito ou débito para R$
export function formatValuePTBR(value) {
    const options = { minimumFractionDigits: 2 }
    return Intl.NumberFormat("pt-br", options).format(parseFloat(value))
}

//Formatando todos os valores de créditos ou débitos para number
export function formatBillingCycleISO(data) {
    const dataCopy = structuredClone(data)
    dataCopy.map((object) => {
        object.value = formatValueISO(object.value)
    })
    return dataCopy
}

//Formatando todos os valores de créditos ou débitos para R$
export function formatBillingCyclePTBR(billingCycle) {
    const dataCopy = structuredClone(billingCycle)

    dataCopy.credits.map((credit) => {
        credit.value = formatValuePTBR(credit.value)
    })
    dataCopy.debts.map((debt) => {
        debt.value = formatValuePTBR(debt.value)
    })

    return dataCopy
}

//Calculando o somatório de créditos e débitos de um ciclo de pagamentos
export function calculateSummary({ credits, debts }) {
    const creditsISO = formatBillingCycleISO(credits)
    const debtsISO = formatBillingCycleISO(debts)
    const creditSum = creditsISO.reduce((acc, credit) => (acc += credit.value), 0)
    const debtSum = debtsISO.reduce((acc, debt) => (acc += debt.value), 0)
    return {
        credit: creditSum,
        debt: debtSum,
        balance: creditSum - debtSum
    }
}

//Criando um cache para dados vindos de consultas à APIs
export function queryCache() {
    const cache = {
        data: {}
    }

    const getItem = async (itemId, query) => {
        const item = cache.data[itemId]

        if (item) {
            return item
        }

        cache.data[itemId] = query()
        return cache.data[itemId]
    }

    const removeItem = (itemId) => {
        delete cache.data[itemId]
    }

    return { getItem, removeItem }
}
