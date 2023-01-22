//useModal é um hook personalizado utilizado em useCostumers.jsx

import { useState } from "react"

export default function useModal(initialState) {
    const [modal, setModal] = useState(initialState || false)

    function closeModal() {
        setModal(false)
    }

    return {
        modalVisible: modal === true,
        modalHidden: modal === false,
        closeModal,
        setModal
    }
}
