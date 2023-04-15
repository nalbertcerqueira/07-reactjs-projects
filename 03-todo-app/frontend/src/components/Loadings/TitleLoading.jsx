import propTypes from "prop-types"
import React from "react"

//Loading do título da página utilizado em Todo.jsx
export default function TitleLoading(props) {
    return (
        <div
            className={`px-3 sm:px-0 mt-9 w-full pb-5 border-b-2
            border-neutral-200 ${props.className || ""}`}
        >
            <span
                className={`loading-gradient block w-56 sm:w-64 h-8
                bg-neutral-300 rounded-md`}
            />
        </div>
    )
}
TitleLoading.propTypes = {
    className: propTypes.string
}
