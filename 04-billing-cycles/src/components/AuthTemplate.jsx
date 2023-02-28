import propTypes from "prop-types"
import { ToastContainer } from "react-toastify"
import BalanceIcon from "./icons/dashboard/BalanceIcon"

//Template utilizado nas páginas login.jsx e signup.jsx
export default function AuthTemplate({ children }) {
    return (
        <>
            <div className="auth-container">
                <div className="flex gap-3 items-center m-auto w-fit pt-6 mb-6">
                    <span className="block">
                        <BalanceIcon stroke="stroke-zinc-700 w-12 h-12" />
                    </span>
                    <h1 className="text-center text-3xl text-zinc-700 whitespace-nowrap">
                        <b>My </b>Money
                    </h1>
                </div>
                <div className="form-container">
                    <p className="text-center mb-2">Bem vindo!</p>
                    {children}
                </div>
            </div>
            <ToastContainer position="top-right" pauseOnHover={true} newestOnTop={true} />
        </>
    )
}
AuthTemplate.propTypes = {
    children: propTypes.node
}
