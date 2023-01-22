import propTypes from "prop-types"
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}

App.propTypes = {
    Component: propTypes.any,
    pageProps: propTypes.any
}
