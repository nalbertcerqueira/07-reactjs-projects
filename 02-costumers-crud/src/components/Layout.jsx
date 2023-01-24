//Componente Layout utilizado em index.jsx

import propTypes from "prop-types"
import Title from "./Ttitle"

export default function Layout(props) {
    return (
        <div
            className="bg-white flex flex-col text-gray-800 w-2/3
            rounded-xl text-2xl min-w-fit whitespace-nowrap opacity-0 animate-showLayout max-h-screen"
        >
            <Title>{props.title}</Title>
            <section className="m-6 overflow-y-auto">{props.children}</section>
        </div>
    )
}

Layout.propTypes = {
    title: propTypes.string,
    children: propTypes.node
}
