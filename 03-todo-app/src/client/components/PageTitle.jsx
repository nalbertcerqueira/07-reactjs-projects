import propTypes from "prop-types"
import React from "react"

//Componente utilizado nas pages About.jsx e Todo.jsx
export default function PageTitle(props) {
    return (
        <section className="page-header">
            <h2 className="font-bold text-3xl text-neutral-700">
                {props.title}{" "}
                <span className="text-neutral-500 text-2xl font-semibold">{props.small}</span>
            </h2>
        </section>
    )
}

PageTitle.propTypes = {
    title: propTypes.string,
    small: propTypes.string
}
