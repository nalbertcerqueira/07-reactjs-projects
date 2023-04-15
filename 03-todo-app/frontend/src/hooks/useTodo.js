import { useState } from "react"

export default function useTodo(refreshData) {
    const [taskInput, setTaskInput] = useState("")
    const [isInputValid, setIsInputValid] = useState(true)
    const [filterTag, setFilterTag] = useState("")

    //Controlando o input do formulário de cadastro de tarefas (Form.jsx)
    function handleTaskInput(event) {
        setTaskInput(event.target.value)
        if (!isInputValid) setIsInputValid(true)
    }

    //Removendo o filtro de tarefas
    function removeFilter() {
        setFilterTag("")
        setTaskInput("")
        refreshData()
    }

    //Filtrando a lista de tarefas
    function filterTasks() {
        setFilterTag(taskInput)
        refreshData(taskInput)
    }

    //Adicionando uma nova tarefa
    async function addTask(event) {
        event.preventDefault()

        if (taskInput === "") return setIsInputValid(false)
        else setIsInputValid(true)

        fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ taskDescription: taskInput }),
            headers: { "Content-Type": "application/json" }
        })
            .then(async (response) => {
                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.message)
                }
                await refreshData()
                setFilterTag("")
                setTaskInput("")
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //Excluindo uma tarefa da lista
    async function removeTask(taskId) {
        fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
            method: "DELETE",
            credentials: "include"
        })
            .then(async (response) => {
                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.message)
                }
                refreshData(filterTag ? taskInput : "")
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //Marcando uma tarefa como concluída ou pendente
    async function updateTask({ taskId, isDone }) {
        fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
            credentials: "include",
            method: "PUT",
            body: JSON.stringify({ done: isDone }),
            headers: { "Content-Type": "application/json" }
        })
            .then(async (response) => {
                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.message)
                }
                refreshData(filterTag ? taskInput : "")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return {
        filterTag,
        isInputValid,
        taskInput,
        methods: {
            addTask,
            filterTasks,
            handleTaskInput,
            removeFilter,
            removeTask,
            updateTask
        }
    }
}
