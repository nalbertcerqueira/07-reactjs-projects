import propTypes from "prop-types"
import { ToastContainer } from "react-toastify"
import AppProvider from "../contexts/AppContext"
import Footer from "./layout/Footer"
import Header from "./layout/Header"
import Sidebar from "./layout/Sidebar"

//Template utilizado nas páginas index.jsx e billing-cycle.jsx
export default function AppTemplate({ children }) {
    return (
        <AppProvider>
            <div className="min-h-screen min-w-full flex justify-end">
                <Sidebar />
                <main className="w-full flex flex-col transition-all duration-700 md:w-full">
                    <Header className="shrink-0 self-start w-full z-20" />
                    <div className="h-full px-4 py-3 bg-slate-200">{children}</div>
                    <Footer />
                </main>
            </div>
            <ToastContainer position="top-right" pauseOnHover={true} newestOnTop={true} />
        </AppProvider>
    )
}

AppTemplate.propTypes = {
    toggleMenu: propTypes.func,
    menuOpen: propTypes.bool,
    children: propTypes.node
}
