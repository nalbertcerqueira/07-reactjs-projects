import propTypes from "prop-types"
import React, { useEffect, useState } from "react"

import Button from "../Button"
import { DoneIcon, TrashIcon, UndoIcon } from "../Icons"

//Componente utilizado em TodoList.jsx
export default function TodoRow({ task, markTask, removeTask }) {
    const [willRemove, setWillRemove] = useState(false)
    const taskDoneMarker = task.done ? "todo-container__marker--done" : ""
    const taksDone = task.done ? "todo-container__task--done" : ""

    //Removendo de fato a tarefa após finalizar a animação
    useEffect(() => {
        let timer
        if (willRemove) timer = setTimeout(() => removeTask(task.id), 900)
        return () => clearTimeout(timer)
    }, [willRemove])

    return (
        <tr className={`relative ${willRemove ? "animate-slide" : ""}`}>
            <td className={`todo-container__task ${taksDone}`}>
                <span className={`todo-container__marker ${taskDoneMarker}`}></span>
                {task.taskDescription}
            </td>
            <td className="todo-container__actions">
                <Button
                    tag="Excluir tarefa"
                    hide={!task.done}
                    onClick={() => setWillRemove(true)}
                    className="btn btn--delete mr-3"
                    type="button"
                >
                    <TrashIcon className="stroke-white" />
                </Button>
                <Button
                    tag="Concluir tarefa"
                    hide={task.done}
                    onClick={() => markTask({ taskId: task.id, isDone: true })}
                    className="btn btn--confirm"
                    type="button"
                >
                    <DoneIcon className="stroke-white" />
                </Button>
                <Button
                    tag="Desfazer"
                    hide={!task.done}
                    onClick={() => markTask({ taskId: task.id, isDone: false })}
                    className="btn btn--undo"
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
