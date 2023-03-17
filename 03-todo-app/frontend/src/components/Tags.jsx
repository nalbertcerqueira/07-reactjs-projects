import propTypes from "prop-types"
import React from "react"

import Button from "./Button.jsx"
import { CloseIcon } from "./Icons.jsx"

//Componente utilizado em Button.jsx
export function FloatingTag(props) {
    return <span className={`button-tag ${props.className || ""}`}>{props.tag}</span>
}
FloatingTag.propTypes = {
    tag: propTypes.oneOfType([propTypes.string, propTypes.node]),
    className: propTypes.string
}

//Componente utilizado em Form.jsx
export function FilterTag(props) {
    return (
        <div className={`filter-tag ${props.className || ""}`}>
            <span className="font-medium"></span>
            {props.filter}
            <Button
                type="button"
                onClick={props.closeFilter}
                className="rounded border border-transparent hover:border-neutral-500
                transition-all"
            >
                <CloseIcon className="stroke-neutral-700" />
            </Button>
        </div>
    )
}
FilterTag.propTypes = {
    filter: propTypes.oneOfType([propTypes.string, propTypes.number]),
    closeFilter: propTypes.func,
    className: propTypes.string
}
