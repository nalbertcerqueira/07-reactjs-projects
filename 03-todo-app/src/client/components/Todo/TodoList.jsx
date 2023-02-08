import propTypes from "prop-types"
import React, { useState } from "react"

import Button from "../Button.jsx"
import { DoneIcon, TrashIcon, UndoIcon } from "../Icons.jsx"

//Lista de tarefas utilizada em TodoList.jsx
export default function TodoList(props) {
    const [currentId, setCurrentId] = useState("")

    //Animando a exclusão da tarefa antes dela ser removida
    function animateTaskDelete(task) {
        setCurrentId(
            () => task.id,
            setTimeout(() => props.removeTask(task.id), 900)
        )
    }

    //Rederizando os botões de ações de cada tarefa
    function renderActions(task) {
        return (
            <td className="td-actions">
                <Button
                    tag="Excluir tarefa"
                    hide={!task.done}
                    onClick={() => animateTaskDelete(task)}
                    color="red"
                    className="p-1 rounded-sm mr-3 transition-all"
                    type="button"
                >
                    <TrashIcon className="stroke-white" />
                </Button>
                <Button
                    tag="Concluir tarefa"
                    hide={task.done}
                    onClick={() => props.markTask({ taskId: task.id, isDone: true })}
                    color="green"
                    className="p-1 rounded-sm transition-all"
                    type="button"
                >
                    <DoneIcon className="stroke-white" />
                </Button>
                <Button
                    tag="Desfazer"
                    hide={!task.done}
                    onClick={() => props.markTask({ taskId: task.id, isDone: false })}
                    color="yellow"
                    className="p-1 rounded-sm transition-all"
                    type="button"
                >
                    <UndoIcon className="stroke-white" />
                </Button>
            </td>
        )
    }

    //Renderizando as linhas do corpo da tabela
    function renderRows() {
        return props.list?.map((task) => {
            const slideAnimation = task.id === currentId && "animate-slide"
            return (
                <tr className={`relative ${slideAnimation}`} key={task.id}>
                    <td className={`table-data ${task.done && "task-done description-done"}`}>
                        <span
                            className={`task-mark ${
                                task.done ? "bg-green-600" : "bg-neutral-400"
                            }`}
                        ></span>
                        {task.taskDescription}
                    </td>
                    {renderActions(task)}
                </tr>
            )
        })
    }

    return (
        <section className={`mt-6 max-h-70-screen overflow-x-hidden ${props.className}`}>
            <table className="w-full">
                <thead>
                    <tr className="text-left text-neutral-700 border-b-2 border-neutral-300">
                        <th className="py-2">Descrição</th>
                        <th className="py-2 text-right pr-8">Ações</th>
                    </tr>
                </thead>
                <tbody>{renderRows()}</tbody>
            </table>
        </section>
    )
}
TodoList.propTypes = {
    className: propTypes.string,
    list: propTypes.array,
    removeTask: propTypes.func,
    markTask: propTypes.func
}
