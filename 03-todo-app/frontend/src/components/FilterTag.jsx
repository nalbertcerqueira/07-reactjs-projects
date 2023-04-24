import propTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import Button from "./Button.jsx"
import { CloseIcon } from "./Icons.jsx"

//Componente utilizado em TodoForm.jsx
export function FilterTag({ filter, closeFilter }) {
    const [willClose, setWillClose] = useState(false)
    const timerRef = useRef(null)

    //Limpando o timer após a remoção do componente no DOM
    useEffect(() => clearTimeout(timerRef.current), [])

    function handleClose() {
        setWillClose(true)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(closeFilter, 600)
    }

    return (
        <div className={`filter-tag ${willClose ? "filter-tag--slide" : ""}`}>
            <span className="overflow-hidden text-ellipsis">{filter}</span>
            <Button type="button" onClick={handleClose} className="filter-tag__btn">
                <CloseIcon className="stroke-neutral-700" />
            </Button>
        </div>
    )
}
FilterTag.propTypes = {
    filter: propTypes.oneOfType([propTypes.string, propTypes.number]),
    closeFilter: propTypes.func
}
