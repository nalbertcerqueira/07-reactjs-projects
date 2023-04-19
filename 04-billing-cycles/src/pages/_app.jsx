import propTypes from "prop-types"
import "react-toastify/dist/ReactToastify.css"
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
    return (
        <>
            {Component.PageTemplate ? (
                <Component.PageTemplate>
                    <Component {...pageProps} />
                </Component.PageTemplate>
            ) : (
                <Component {...pageProps} />
            )}
        </>
    )
}

App.propTypes = {
    Component: propTypes.any,
    pageProps: propTypes.any
}
