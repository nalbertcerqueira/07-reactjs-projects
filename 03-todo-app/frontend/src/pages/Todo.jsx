import propTypes from "prop-types"
import React from "react"

import ErrorMsg from "../components/Error.jsx"
import FormLoading from "../components/Loadings/FormLoading.jsx"
import ListLoading from "../components/Loadings/ListLoading.jsx"
import TitleLoading from "../components/Loadings/TitleLoading.jsx"
import PageTitle from "../components/PageTitle.jsx"
import TodoForm from "../components/Todo/TodoForm.jsx"
import TodoList from "../components/Todo/TodoList.jsx"
import useTodo from "../hooks/userTodo.js"

//Page: lista de tarefas utilizada em AppRoutes.jsx
export default function Todo({ refreshData, data, error }) {
    const { taskDescription, isFormValid, filterTag, methods } = useTodo(refreshData)

    if (error)
        return (
            <ErrorMsg
                className="animate-display"
                status="500"
                message="Sorry for the inconvenient, we're facing some problems in our systems."
            />
        )

    return (
        <>
            {!data && (
                <>
                    <TitleLoading className="animate-display" />
                    <FormLoading className="animate-display" />
                    <ListLoading className="animate-display" rows={5} />
                </>
            )}
            {data && (
                <>
                    <PageTitle title="Tarefas" small="Cadastro" />
                    <TodoForm
                        isValid={isFormValid}
                        filter={filterTag}
                        removeFilter={methods.removeFilter}
                        handleInput={methods.handleInput}
                        handleSubmit={methods.handleSubmit}
                        handleSearch={methods.handleSearch}
                        taskDescription={taskDescription}
                        className="animate-display"
                    />
                    <TodoList
                        list={data}
                        removeTask={methods.removeTask}
                        markTask={methods.markTask}
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
    refreshData: propTypes.func
}
