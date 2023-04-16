import propTypes from "prop-types"
import React from "react"

//Componente utilizado em About.jsx e Todo.jsx
export default function PageTitle(props) {
    return (
        <section className="title-container">
            <h2 className="title-container__title">
                {props.title}{" "}
                <span className="title-container__small">{props.small}</span>
            </h2>
        </section>
    )
}

PageTitle.propTypes = {
    title: propTypes.string,
    small: propTypes.string
}
