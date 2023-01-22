//Componente CustomHead utilizado em index.jsx

import Head from "next/head"
import propTypes from "prop-types"

export default function CustomHead({ title }) {
    return (
        <Head>
            <title>{title}</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0 minimum-scale=1.0"
            />
        </Head>
    )
}

CustomHead.propTypes = {
    title: propTypes.string.isRequired
}
