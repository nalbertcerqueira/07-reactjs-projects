import propTypes from "prop-types"
import React from "react"

//Loading da lista de tarefas utilizado em Todo.jsx
export default function ListLoading(props) {
    function renderRows(rows) {
        return new Array(rows).fill(1).map((row, i) => {
            return (
                <div key={i} className="todo-loading__inner">
                    <span className="todo-loading__bar loading-gradient" />
                    <div className="flex gap-3">
                        <span className="todo-loading__btn" />
                        <span className="todo-loading__btn" />
                    </div>
                </div>
            )
        })
    }
    return <div className="todo-loading">{renderRows(props.rows)}</div>
}
ListLoading.propTypes = {
    rows: propTypes.number.isRequired
}
