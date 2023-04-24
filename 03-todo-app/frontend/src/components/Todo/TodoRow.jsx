import propTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"

import Button from "../Button"
import { DoneIcon, TrashIcon, UndoIcon } from "../Icons"

//Componente utilizado em TodoList.jsx
export default function TodoRow({ task, markTask, removeTask }) {
    const timerRef = useRef(null)
    const [willRemove, setWillRemove] = useState(false)
    const taksDone = task.done ? "todo-container__task--done" : ""
    const taskDoneMarker = task.done ? "todo-container__marker--done" : ""

    //Limpando o timer após a remoção do componente no DOM
    useEffect(() => clearTimeout(timerRef.current), [])

    function handleRemove() {
        setWillRemove(true)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => removeTask(task.id), 900)
    }

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
                    onClick={handleRemove}
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
