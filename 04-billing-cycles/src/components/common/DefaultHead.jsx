import favicon from "@/public/favicon.png"
import Head from "next/head"
import propTypes from "prop-types"

export default function DefaultHead({ title }) {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
            />
            meta
            <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
            <title>{title}</title>
        </Head>
    )
}
DefaultHead.propTypes = {
    title: propTypes.string
}
