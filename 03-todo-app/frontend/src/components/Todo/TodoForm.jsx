import propTypes from "prop-types"
import React from "react"

import Button from "../Button.jsx"
import { FilterTag } from "../FilterTag.jsx"
import { PlusIcon, SearchIcon } from "../Icons.jsx"

//Formulário utilizado em Todo.jsx
export default function TodoForm(props) {
    const inputBorder = props.isValid ? "" : "form-container__input--invalid"

    return (
        <section className="form-container">
            <form className="flex gap-6 pr-1">
                <input
                    className={`form-container__input ${inputBorder}`}
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
                        className="btn btn--submit"
                    >
                        <PlusIcon className="stroke-white" />
                    </Button>
                    <Button
                        tag="Filtrar"
                        onClick={props.handleSearch}
                        color="cyan"
                        type="button"
                        className="btn btn--search"
                    >
                        <SearchIcon className="stroke-white" />
                    </Button>
                </div>
            </form>
            {!props.isValid && (
                <span className="block text-red-500 mt-2">
                    A tarefa não pode está vazia.
                </span>
            )}
            {props.filter && (
                <FilterTag closeFilter={props.removeFilter} filter={props.filter} />
            )}
        </section>
    )
}
TodoForm.propTypes = {
    isValid: propTypes.bool,
    filter: propTypes.string,
    taskDescription: propTypes.string,
    handleSubmit: propTypes.func,
    handleSearch: propTypes.func,
    handleInput: propTypes.func,
    removeFilter: propTypes.func
}
