//usePage é um hook personalizado utilizado em useCostumers.jsx

import { useState } from "react"

export default function usePage(initialState) {
    const [page, setPage] = useState(initialState || "table")

    function displayForm() {
        setPage("form")
    }

    function displayTable() {
        setPage("table")
    }

    return {
        displayTable,
        displayForm,
        tableVisible: page === "table",
        formVisible: page === "form"
    }
}
