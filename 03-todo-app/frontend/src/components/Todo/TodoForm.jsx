import React, { useContext } from "react"

import { FormContext } from "../../contexts/FormContext.jsx"
import { TodoContext } from "../../contexts/TodoContext.jsx"
import useTodoApi from "../../hooks/useTodoApi.js"

import Button from "../Button.jsx"
import { FilterTag } from "../FilterTag.jsx"
import { PlusIcon, SearchIcon } from "../Icons.jsx"

//Formulário utilizado em Todo.jsx
export default function TodoForm() {
    const { taskInput, isInputValid, filterTag, methods } = useContext(FormContext)
    const { setTodoList } = useContext(TodoContext)
    const { post, get } = useTodoApi()
    const inputBorder = isInputValid ? "" : "form-container__input--invalid"

    function addTask(event) {
        event.preventDefault()
        if (taskInput === "") return methods.setIsInputValid(false)
        else methods.setIsInputValid(true)

        post(taskInput, async () => {
            methods.resetForm()
            const todoList = await get()
            setTodoList(todoList)
        })
    }

    async function filterTasks() {
        methods.showFilterTag()
        const todoList = await get(taskInput)
        setTodoList(todoList)
    }

    async function closeFilter() {
        methods.closeFilterTag()
        const todoList = await get()
        setTodoList(todoList)
    }

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
                        onClick={addTask}
                        color="blue"
                        type="submit"
                        className="btn btn--submit"
                    >
                        <PlusIcon className="stroke-white" />
                    </Button>
                    <Button
                        tag="Filtrar"
                        onClick={filterTasks}
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
            {filterTag && <FilterTag closeFilter={closeFilter} filter={filterTag} />}
        </section>
    )
}
