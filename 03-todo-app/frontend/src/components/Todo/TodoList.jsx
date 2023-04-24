import propTypes from "prop-types"
import React, { useContext } from "react"
import { FormContext } from "../../contexts/FormContext"
import { TodoContext } from "../../contexts/TodoContext"
import useTodoApi from "../../hooks/useTodoApi"
import TodoRow from "./TodoRow"

//Lista de tarefas utilizada em Todo.jsx
export default function TodoList({ tasks }) {
    const { filterTag } = useContext(FormContext)
    const { setTodoList } = useContext(TodoContext)
    const { put, remove, get } = useTodoApi()

    function markTask({ taskId, isDone }) {
        put({ taskId, isDone }, async () => {
            const todoList = await get(filterTag || "")
            setTodoList(todoList)
        })
    }

    async function removeTask(taskId) {
        await remove(taskId, async () => {
            const todoList = await get(filterTag || "")
            setTodoList(todoList)
        })
    }

    return (
        <section className="todo-container">
            <table className="w-full">
                <thead>
                    <tr className="todo-container__thead-row">
                        <th className="py-2">Descrição</th>
                        <th className="py-2 text-right pr-8">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => {
                        return (
                            <TodoRow
                                key={task.id}
                                task={task}
                                markTask={markTask}
                                removeTask={removeTask}
                            />
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}
TodoList.propTypes = {
    tasks: propTypes.array
}
