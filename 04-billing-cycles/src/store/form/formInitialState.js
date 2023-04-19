export const formInitialState = {
    id: "",
    name: "",
    month: "",
    year: "",
    credits: [{ id: "", name: "", value: "0,00" }],
    debts: [{ id: "", name: "", status: "PENDENTE", value: "0,00" }],
    validations: { name: true, month: true, year: true, credits: true, debts: true }
}
