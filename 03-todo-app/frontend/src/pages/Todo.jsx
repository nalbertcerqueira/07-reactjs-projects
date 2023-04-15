import propTypes from "prop-types"
import React, { useContext } from "react"
import { Context as TodoContext } from "../contexts/TodoContext.jsx"

import ErrorMsg from "../components/Error.jsx"
import FormLoading from "../components/Loadings/FormLoading.jsx"
import ListLoading from "../components/Loadings/ListLoading.jsx"
import TitleLoading from "../components/Loadings/TitleLoading.jsx"
import PageTitle from "../components/PageTitle.jsx"
import TodoForm from "../components/Todo/TodoForm.jsx"
import TodoList from "../components/Todo/TodoList.jsx"
import useTodo from "../hooks/useTodo.js"

//Página da lista de tarefas, utilizada em AppRoutes.jsx
export default function Todo() {
    const { todoList, error, refreshTodo } = useContext(TodoContext)
    const { taskInput, isInputValid, filterTag, methods } = useTodo(refreshTodo)

    if (error)
        return (
            <ErrorMsg
                className="animate-display"
                status="500"
                message="Sorry for the inconvenient,
                we're facing some problems in our systems."
            />
        )

    return (
        <>
            {!todoList && (
                <>
                    <TitleLoading className="animate-display" />
                    <FormLoading className="animate-display" />
                    <ListLoading className="animate-display" rows={5} />
                </>
            )}
            {todoList && (
                <>
                    <PageTitle title="Tarefas" small="Cadastro" />
                    <TodoForm
                        isValid={isInputValid}
                        filter={filterTag}
                        removeFilter={methods.removeFilter}
                        handleInput={methods.handleTaskInput}
                        handleSubmit={methods.addTask}
                        handleSearch={methods.filterTasks}
                        taskDescription={taskInput}
                        className="animate-display"
                    />
                    <TodoList
                        tasks={todoList}
                        removeTask={methods.removeTask}
                        markTask={methods.updateTask}
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
