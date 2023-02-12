import propTypes from "prop-types"
import React from "react"

//Loading da lista de tarefas utilizado em Todo.jsx
export default function ListLoading(props) {
    function renderRows(rows) {
        let rowsArray = []
        for (let i = 0; i < rows; i++) {
            rowsArray.push(
                <div key={i} className="list-loading-container">
                    <span className="block rounded-md w-32 sm:w-60 h-4 loading-gradient"></span>
                    <div className="flex gap-3">
                        <span className="block rounded-md w-9 h-9 bg-neutral-300"></span>
                        <span className="block rounded-md w-9 h-9 bg-neutral-300"></span>
                    </div>
                </div>
            )
        }
        return rowsArray
    }
    return (
        <div className={`px-3 sm:px-0 mt-8 h-72 rounded-x w-full ${props.className}`}>
            {renderRows(props.rows)}
        </div>
    )
}
ListLoading.propTypes = {
    className: propTypes.string,
    rows: propTypes.number.isRequired
    // children: propTypes.node
}
