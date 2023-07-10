export const formInitialState = {
    _id: "",
    name: "",
    month: "",
    year: "",
    credits: [{ _id: "", name: "", value: "0,00" }],
    debts: [{ _id: "", name: "", status: "PENDENTE", value: "0,00" }],
    validations: { name: true, month: true, year: true, credits: true, debts: true }
}
