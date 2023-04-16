import React, { useContext } from "react"

import { TodoContext } from "../../contexts/TodoContext.jsx"
import useTodo from "../../hooks/useTodo.js"
import Button from "../Button.jsx"
import { FilterTag } from "../FilterTag.jsx"
import { PlusIcon, SearchIcon } from "../Icons.jsx"

//Formulário utilizado em Todo.jsx
export default function TodoForm() {
    const { refreshTodo } = useContext(TodoContext)
    const { taskInput, isInputValid, filterTag, methods } = useTodo(refreshTodo)
    const inputBorder = isInputValid ? "" : "form-container__input--invalid"

    return (
        <section className="form-container">
            <form className="flex gap-6 pr-1">
                <input
                    className={`form-container__input ${inputBorder}`}
                    type="text"
                    placeholder="Adicione uma tarefa"
                    onChange={methods.handleTaskInput}
                    value={taskInput}
                />
                <div className="flex gap-3">
                    <Button
                        tag="Nova Tarefa"
                        onClick={methods.addTask}
                        color="blue"
                        type="submit"
                        className="btn btn--submit"
                    >
                        <PlusIcon className="stroke-white" />
                    </Button>
                    <Button
                        tag="Filtrar"
                        onClick={methods.filterTasks}
                        color="cyan"
                        type="button"
                        className="btn btn--search"
                    >
                        <SearchIcon className="stroke-white" />
                    </Button>
                </div>
            </form>
            {!isInputValid && (
                <span className="block text-red-500 mt-2">
                    A tarefa não pode está vazia.
                </span>
            )}
            {filterTag && (
                <FilterTag closeFilter={methods.removeFilter} filter={filterTag} />
            )}
        </section>
    )
}
