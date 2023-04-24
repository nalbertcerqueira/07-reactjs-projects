import React, { useContext } from "react"

import ErrorMsg from "../components/Error.jsx"
import FormLoading from "../components/Loadings/FormLoading.jsx"
import ListLoading from "../components/Loadings/ListLoading.jsx"
import TitleLoading from "../components/Loadings/TitleLoading.jsx"
import PageTitle from "../components/PageTitle.jsx"
import TodoForm from "../components/Todo/TodoForm.jsx"
import TodoList from "../components/Todo/TodoList.jsx"
import { TodoContext } from "../contexts/TodoContext.jsx"

//Página da lista de tarefas, utilizada em AppRoutes.jsx
export default function Todo() {
    const { todoList, error } = useContext(TodoContext)

    if (error)
        return (
            <ErrorMsg
                status="500"
                message="Sorry for the inconvenient,
                we're facing some problems in our systems."
            />
        )

    return (
        <>
            {!todoList && (
                <>
                    <TitleLoading />
                    <FormLoading />
                    <ListLoading rows={5} />
                </>
            )}
            {todoList && (
                <>
                    <PageTitle title="Tarefas" small="Cadastro" />
                    <TodoForm />
                    <TodoList tasks={todoList} />
                </>
            )}
        </>
    )
}
