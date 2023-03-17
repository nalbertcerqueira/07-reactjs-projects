import propTypes from "prop-types"
import React from "react"

//Loading do formulário utilizado em Todo.jsx
export default function FormLoading(props) {
    return (
        <div className={`${props.className} px-3 sm:px-0 w-full flex items-center gap-6 mt-8`}>
            <span className="block w-full h-9 rounded-md loading-gradient"></span>
            <div className="flex gap-3">
                <span className="block h-11 w-11 bg-neutral-300 rounded-md shrink-0"></span>
                <span className="block h-11 w-11 bg-neutral-300 rounded-md shrink-0"></span>
            </div>
        </div>
    )
}
FormLoading.propTypes = {
    className: propTypes.string
}
