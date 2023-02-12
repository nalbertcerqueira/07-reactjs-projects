import propTypes from "prop-types"
import React, { useState } from "react"

import Button from "../Button.jsx"
import { PlusIcon, SearchIcon } from "../Icons.jsx"
import { FilterTag } from "../Tags.jsx"

//Formulário utilizado na página Todo.jsx
export default function TodoForm(props) {
    const inputBorder = props.isValid ? "border-neutral-300" : "border-red-500"
    const [animation, setAnimation] = useState("")

    //Aplicando uma animação antes de fechar o filtro
    function closeFilter() {
        setAnimation(
            () => "animate-[slide_0.6s_forwards_ease-in-out]",
            setTimeout(() => {
                setAnimation("")
                props.removeFilter()
            }, 600)
        )
    }

    return (
        <section className={`px-3 sm:px-0 mt-8 ${props.className}`}>
            <form className="flex gap-6 pr-1">
                <input
                    className={`form-input ${inputBorder}`}
                    type="text"
                    placeholder="Adicione uma tarefa"
                    onChange={props.handleInput}
                    value={props.taskDescription}
                />
                <div className="flex gap-3">
                    <Button
                        tag="Nova Tarefa"
                        onClick={props.handleSubmit}
                        color="blue"
                        type="submit"
                        className="self-center p-2 rounded-sm transition-all"
                    >
                        <PlusIcon className="stroke-white" />
                    </Button>
                    <Button
                        tag="Filtrar"
                        onClick={props.handleSearch}
                        color="cyan"
                        type="button"
                        className="self-center p-2 rounded-sm transition-all"
                    >
                        <SearchIcon className="stroke-white" />
                    </Button>
                </div>
            </form>
            {!props.isValid && (
                <span className="block text-red-500 mt-2">A tarefa não pode está vazia.</span>
            )}
            {props.filter && (
                <FilterTag
                    className={animation}
                    closeFilter={closeFilter}
                    filter={props.filter}
                />
            )}
        </section>
    )
}
TodoForm.propTypes = {
    isValid: propTypes.bool,
    filter: propTypes.string,
    className: propTypes.string,
    taskDescription: propTypes.oneOfType([propTypes.string, propTypes.number]),
    handleSubmit: propTypes.func,
    handleSearch: propTypes.func,
    handleInput: propTypes.func,
    removeFilter: propTypes.func
}
