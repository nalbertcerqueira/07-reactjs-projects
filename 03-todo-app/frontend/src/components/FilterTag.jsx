import propTypes from "prop-types"
import React, { useEffect, useState } from "react"
import Button from "./Button.jsx"
import { CloseIcon } from "./Icons.jsx"

//Componente utilizado em Form.jsx
export function FilterTag(props) {
    const animation = "animate-[slide_0.6s_forwards_ease-in-out]"
    const [willClose, setWillClose] = useState(false)

    useEffect(() => {
        let timer
        if (willClose) timer = setTimeout(props.closeFilter, 600)
        return () => clearTimeout(timer)
    }, [willClose])

    return (
        <div className={`filter-tag ${willClose ? animation : ""}`}>
            <span className="font-medium"></span>
            {props.filter}
            <Button
                type="button"
                onClick={() => setWillClose(true)}
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
    closeFilter: propTypes.func
}
