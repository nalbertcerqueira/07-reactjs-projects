import React from "react"

//Loading do formulário utilizado em Todo.jsx
export default function FormLoading() {
    return (
        <div className="form-loading">
            <span className="form-loading__bar loading-gradient" />
            <div className="flex gap-3">
                <span className="form-loading__btn" />
                <span className="form-loading__btn" />
            </div>
        </div>
    )
}
