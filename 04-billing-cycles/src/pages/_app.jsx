/* eslint-disable react/jsx-no-undef */
import propTypes from "prop-types"
import "react-toastify/dist/ReactToastify.css"
import "../styles/globals.css"

import AuthContext from "../contexts/AuthContext"
import FormsContext from "../contexts/FormsContext"
import MainContext from "../contexts/MainContext"
import MenuContext from "../contexts/MenuContext"
import ModalsContext from "../contexts/ModalsContext"

export default function App({ Component, pageProps }) {
    return (
        <AuthContext>
            <MainContext>
                <MenuContext>
                    <ModalsContext>
                        <FormsContext>
                            {Component.PageTemplate ? (
                                <Component.PageTemplate>
                                    <Component {...pageProps} />
                                </Component.PageTemplate>
                            ) : (
                                <Component {...pageProps} />
                            )}
                        </FormsContext>
                    </ModalsContext>
                </MenuContext>
            </MainContext>
        </AuthContext>
    )
}

App.propTypes = {
    Component: propTypes.any,
    pageProps: propTypes.any
}
