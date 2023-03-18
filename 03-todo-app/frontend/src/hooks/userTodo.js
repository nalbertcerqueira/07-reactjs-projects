import { useEffect, useState } from "react"

export default function useTodo(refreshData) {
    const [taskDescription, setTaskDescription] = useState("")
    const [isFormValid, setFormValidity] = useState(true)
    const [filterTag, setFilterTag] = useState("")

    useEffect(() => {
        refreshData()
    }, [])

    //Criando uma nova tarefa (Form.jsx)
    async function handleSubmit(event) {
        event.preventDefault()

        if (taskDescription === "") return setFormValidity(false)
        else setFormValidity(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                credentials: "include",
                method: "POST",
                body: JSON.stringify({ taskDescription }),
                headers: { "Content-Type": "application/json" }
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message)
            } else {
                await refreshData()
                setFilterTag("")
            }
        } catch (error) {
            return console.log(error.message)
        }
        setTaskDescription("")
    }
    //Executando a filtragem de tarefas de acordo com o taskDescription
    function handleSearch(event) {
        event.preventDefault()
        refreshData(taskDescription)
        setFilterTag(taskDescription)
    }
    //Controlando o input do formulário de cadastro de tarefas (Form.jsx)
    function handleInput(event) {
        setTaskDescription(event.target.value)
    }

    //Removendo o filtro de tarefas
    function removeFilter() {
        setFilterTag("")
        setTaskDescription("")
        refreshData()
    }

    //Excluindo uma tarefa da lista
    async function removeTask(taskId) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            )
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message)
            } else {
                refreshData(taskDescription)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    //Marcando uma tarefa como concluída ou pendente
    async function markTask({ taskId, isDone }) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
                {
                    credentials: "include",
                    method: "PUT",
                    body: JSON.stringify({ done: isDone }),
                    headers: { "Content-Type": "application/json" }
                }
            )
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message)
            } else {
                refreshData(taskDescription)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return {
        filterTag,
        isFormValid,
        taskDescription,
        methods: {
            handleSubmit,
            handleSearch,
            handleInput,
            removeFilter,
            removeTask,
            markTask
        }
    }
}
