//useCostumers é o hook personlizado principal utilizado em index.jsx

import { useState } from "react"

import Costumer from "../core/Costumer"
import useModal from "./useModal"
import usePage from "./usePage"

export default function useCostumers(initialState) {
    //costumers corresponde ao array de clientes no formato {name, age, id}
    //currentCostumer corresponde ao cliente que será exibido no formulário de edição/cadastro
    //currentId corresponde ao id do cliente utilizado pelo modal para confirmar a exclusão do mesmo
    const [costumers, setCostumers] = useState(initialState)
    const [currentCostumer, setCurrentCostumer] = useState(Costumer.emptyCostumer())
    const [currentId, setCurrentId] = useState(null)

    //Importando métodos e propriedades dos hooks personalizados useModal e usePage
    const { closeModal, setModal, modalVisible } = useModal(false)
    const { displayForm, displayTable, formVisible, tableVisible } = usePage("table")

    //Ações realacionadas a criação, edição, deleção e visualização dos clientes
    function editCostumerInfo(costumer) {
        setCurrentCostumer(costumer)
        displayForm()
    }
    async function getCostumersData() {
        if (formVisible) return
        fetch("http://localhost:3000/api/data")
            .then(async (response) => {
                return response.json()
            })
            .then((data) => {
                setCostumers(data.costumers)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    async function deleteCostumer() {
        try {
            const response = await fetch(`http://localhost:3000/api/data?id=${currentId}`, {
                method: "DELETE"
            })
            console.log(await response.json())
            closeModal()
            await getCostumersData("http://localhost:3000/api/data")
        } catch (error) {
            console.log(error)
        }
    }
    function newCostumer() {
        setCurrentCostumer(Costumer.emptyCostumer())
        displayForm()
    }

    //Ações relacionadas ao formulário de edição/cadastro de clientes
    async function saveForm(costumer, method) {
        if (costumer.name === "" || costumer.age === "") return

        const body = { id: costumer.id, name: costumer.name, age: costumer.age }
        try {
            const response = await fetch("http://localhost:3000/api/data", {
                method,
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            })
            console.log(await response.json())
            response.status === 200 && displayTable()
        } catch (error) {
            console.log(error)
        }
    }
    function cancelForm() {
        displayTable()
    }

    //Ações relacionadas ao modal
    function openModal(costumerId) {
        setCurrentId(costumerId)
        setModal(true)
    }

    return {
        getCostumersData,
        editCostumerInfo,
        deleteCostumer,
        newCostumer,
        cancelForm,
        closeModal,
        openModal,
        saveForm,
        costumers,
        currentCostumer,
        modalVisible,
        tableVisible,
        formVisible
    }
}
