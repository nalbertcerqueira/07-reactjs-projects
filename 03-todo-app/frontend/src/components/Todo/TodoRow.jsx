import propTypes from "prop-types"
import React, { useEffect, useState } from "react"

import Button from "../Button"
import { DoneIcon, TrashIcon, UndoIcon } from "../Icons"

//Componente utilizado em TodoList.jsx
export default function TodoRow({ task, markTask, removeTask }) {
    const [willRemove, setWillRemove] = useState(false)
    const markerStyle = task.done ? "bg-green-600" : "bg-neutral-400"

    //Removendo de fato a tarefa após finalizar a animação
    useEffect(() => {
        let timer
        if (willRemove) timer = setTimeout(() => removeTask(task.id), 900)
        return () => clearTimeout(timer)
    }, [willRemove])

    return (
        <tr className={`relative ${willRemove ? "animate-slide" : ""}`}>
            <td className={`table-data ${task.done ? "task-done description-done" : ""}`}>
                <span className={`task-mark ${markerStyle}`}></span>
                {task.taskDescription}
            </td>
            <td className="td-actions">
                <Button
                    tag="Excluir tarefa"
                    hide={!task.done}
                    onClick={() => setWillRemove(true)}
                    color="red"
                    className="p-1 rounded-sm mr-3 transition-all"
                    type="button"
                >
                    <TrashIcon className="stroke-white" />
                </Button>
                <Button
                    tag="Concluir tarefa"
                    hide={task.done}
                    onClick={() => markTask({ taskId: task.id, isDone: true })}
                    color="green"
                    className="p-1 rounded-sm transition-all"
                    type="button"
                >
                    <DoneIcon className="stroke-white" />
                </Button>
                <Button
                    tag="Desfazer"
                    hide={!task.done}
                    onClick={() => markTask({ taskId: task.id, isDone: false })}
                    color="yellow"
                    className="p-1 rounded-sm transition-all"
                    type="button"
                >
                    <UndoIcon className="stroke-white" />
                </Button>
            </td>
        </tr>
    )
}
TodoRow.propTypes = {
    task: propTypes.object,
    markTask: propTypes.func.isRequired,
    removeTask: propTypes.func.isRequired
}
