import propTypes from "prop-types"
import React, { useEffect, useState } from "react"

import Error from "../components/Error.jsx"
import FormLoading from "../components/Loadings/FormLoading.jsx"
import ListLoading from "../components/Loadings/ListLoading.jsx"
import TitleLoading from "../components/Loadings/TitleLoading.jsx"
import PageTitle from "../components/PageTitle.jsx"
import TodoForm from "../components/Todo/TodoForm.jsx"
import TodoList from "../components/Todo/TodoList.jsx"

//Page: lista de tarefas utilizada em AppRoutes.jsx
export default function Todo(props) {
    const [taskDescription, setTaskDescription] = useState("")
    const [isFormValid, setFormValidity] = useState(true)
    const [filterTag, setFilterTag] = useState("")

    useEffect(() => {
        setTimeout(props.fetcher, 1000)
    }, [])

    //Manipulando o submit do formulário de cadstro (Form.jsx)
    async function handleSubmit(event) {
        event.preventDefault()

        if (taskDescription === "") return setFormValidity(false)
        else setFormValidity(true)

        try {
            await fetch("http://localhost:3000/api/tasks", {
                method: "POST",
                body: JSON.stringify({ taskDescription }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            await props.fetcher()
            setFilterTag("")
        } catch (error) {
            return console.log(error)
        }
        setTaskDescription("")
    }
    //Executando a filtragem de tarefas de acordo com o taskDescription
    function handleSearch(event) {
        event.preventDefault()
        props.fetcher(taskDescription)
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
        props.fetcher()
    }

    //Excluindo uma tarefa da lista
    async function removeTask(taskId) {
        try {
            await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: "DELETE"
            })
            props.fetcher(taskDescription)
        } catch (error) {
            console.log(error)
        }
    }
    //Marcando uma tarefa como concluída ou pendente
    async function markTask({ taskId, isDone }) {
        try {
            await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: "PUT",
                body: JSON.stringify({ done: isDone }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            props.fetcher(taskDescription)
        } catch (error) {
            console.log(error)
        }
    }

    if (props.error)
        return (
            <Error
                className="animate-display"
                status="500"
                message="Sorry for the inconvenient, we're facing some problems in our systems."
            />
        )

    return (
        <>
            {!props.data && (
                <>
                    <TitleLoading className="animate-display" />
                    <FormLoading className="animate-display" />
                    <ListLoading className="animate-display" rows={5} />
                </>
            )}
            {props.data && (
                <>
                    <PageTitle title="Terefas" small="Cadastro" />
                    <TodoForm
                        isValid={isFormValid}
                        filter={filterTag}
                        removeFilter={removeFilter}
                        handleInput={handleInput}
                        handleSubmit={handleSubmit}
                        handleSearch={handleSearch}
                        taskDescription={taskDescription}
                        className="animate-display"
                    />
                    <TodoList
                        list={props.data}
                        removeTask={removeTask}
                        markTask={markTask}
                        className="animate-display"
                    />
                </>
            )}
        </>
    )
}
Todo.propTypes = {
    error: propTypes.bool,
    data: propTypes.array,
    fetcher: propTypes.func
}
