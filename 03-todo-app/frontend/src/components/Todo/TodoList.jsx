import propTypes from "prop-types"
import React from "react"

import TodoRow from "./TodoRow"

//Lista de tarefas utilizada em Todo.jsx
export default function TodoList({ className, tasks, removeTask, markTask }) {
    return (
        <section className={`form-section ${className || ""}`}>
            <table className="w-full">
                <thead>
                    <tr className="text-left text-neutral-700 border-b-2 border-neutral-300">
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
    className: propTypes.string,
    tasks: propTypes.array,
    removeTask: propTypes.func,
    markTask: propTypes.func
}
