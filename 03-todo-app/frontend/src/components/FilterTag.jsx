import propTypes from "prop-types"
import React, { useEffect, useState } from "react"
import Button from "./Button.jsx"
import { CloseIcon } from "./Icons.jsx"

//Componente utilizado em Form.jsx
export function FilterTag(props) {
    const [willClose, setWillClose] = useState(false)

    useEffect(() => {
        let timer
        if (willClose) timer = setTimeout(props.closeFilter, 600)
        return () => clearTimeout(timer)
    }, [willClose])

    return (
        <div className={`filter-tag ${willClose ? "filter-tag--slide" : ""}`}>
            <span className="overflow-hidden text-ellipsis">{props.filter}</span>
            <Button
                type="button"
                onClick={() => setWillClose(true)}
                className="filter-tag__btn"
            >
                <CloseIcon className="stroke-neutral-700" />
            </Button>
        </div>
    )
}
FilterTag.propTypes = {
    filter: propTypes.oneOfType([propTypes.string, propTypes.number]),
    closeFilter: propTypes.func
}
