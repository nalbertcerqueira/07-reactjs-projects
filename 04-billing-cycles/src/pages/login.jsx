import Link from "next/link"

import AuthTemplate from "../components/AuthTemplate"
import Button from "../components/common/Button"
import DefaultHead from "../components/common/DefaultHead"
import Input from "../components/common/Input"
import ValidationMsg from "../components/common/ValidationMsg"
import EmailIcon from "../components/icons/login-signup/EmailIcon"
import PasswordIcon from "../components/icons/login-signup/PasswordIcon"

import useAuth from "../hooks/useAuth"

//Verificando se o JWT do usuário é válido e redirecionando para
//a aplicação em caso positivo.
export function getServerSideProps({ req }) {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth-validation`, {
        method: "GET",
        headers: { Cookie: req.headers.cookie }
    })
        .then(async (response) => {
            if (response.ok) return { redirect: { destination: "/", permanent: false } }
            else return { props: {} }
        })
        .catch((error) => {
            console.log(error.message)
            return { props: {} }
        })
}

Login.PageTemplate = AuthTemplate
export default function Login() {
    const { email, isSubmiting, password, flags, errorMsgs, methods } = useAuth()

    return (
        <>
            <DefaultHead title="MyMoney App - Login" />
            <form className="w-ful mb-5">
                <div className="mb-3">
                    <Input
                        label="Email"
                        labelClassName="auth-input-label"
                        value={email}
                        onChange={methods.changeEmail}
                        placeholder="exemplo@meuemail.com"
                        type="text"
                        id="email"
                        name="email"
                        autoComplete="email"
                        className="input-auth"
                        icon={<EmailIcon className="auth-icon" stroke="auth-icon-svg" />}
                    />
                    {!flags.email && (
                        <div>
                            <ValidationMsg className="mt-1" message={errorMsgs.email} />
                        </div>
                    )}
                </div>
                <div className="mb-5">
                    <Input
                        label="Senha"
                        labelClassName="auth-input-label"
                        value={password}
                        onChange={methods.changePassword}
                        placeholder="Senha"
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        className="input-auth"
                        icon={<PasswordIcon className="auth-icon" stroke="auth-icon-svg" />}
                    />
                    {!flags.password && (
                        <div>
                            <ValidationMsg className="mt-1" message={errorMsgs.password} />
                        </div>
                    )}
                </div>
                <Button
                    disabled={isSubmiting ? true : false}
                    onClick={methods.login}
                    className="create-form-button"
                    type="submit"
                >
                    {isSubmiting ? "Entrando..." : "Entrar"}
                </Button>
            </form>
            <Link className="login-signup-link" href="/signup">
                Novo usuário ? Se cadastre aqui.
            </Link>
        </>
    )
}
