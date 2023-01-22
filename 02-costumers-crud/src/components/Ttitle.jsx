//Componete Title utlizado em Layout.jsx

import propTypes from "prop-types"

export default function Title(props) {
    return (
        <section>
            <h1 className="px-5 py-3 font-semibold">{props.children}</h1>
            <hr className="border-2 border-purple-500" />
        </section>
    )
}

Title.propTypes = {
    children: propTypes.node
}
