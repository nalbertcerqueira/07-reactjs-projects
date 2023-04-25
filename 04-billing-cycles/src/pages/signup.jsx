import Link from "next/link"

import AuthTemplate from "../components/AuthTemplate"
import Button from "../components/common/Button"
import DefaultHead from "../components/common/DefaultHead"
import Input from "../components/common/Input"
import ValidationMsg from "../components/common/ValidationMsg"
import EmailIcon from "../components/icons/login-signup/EmailIcon"
import PasswordIcon from "../components/icons/login-signup/PasswordIcon"
import UserIcon from "../components/icons/login-signup/UserIcon"

import useAuth from "../hooks/useAuth"

//Validando o token do usuário antes de exibir a aplicação
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

Signup.PageTemplate = AuthTemplate
export default function Signup() {
    const { user, flags, isSubmiting, errorMsgs, methods } = useAuth()

    return (
        <>
            <DefaultHead title="MyMoney App - Novo Cadastro" />
            <form className="w-ful mb-5">
                <div className="mb-3">
                    <Input
                        label="Seu nome"
                        labelClassName="auth-input-label"
                        value={user.username}
                        onChange={methods.handleFieldChange}
                        placeholder="Nome e sobrenome"
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="name"
                        className="input-auth"
                        icon={<UserIcon className="auth-icon" stroke="auth-icon-svg" />}
                    />
                    {!flags.username && (
                        <div>
                            <ValidationMsg className="mt-1" message={errorMsgs.username} />
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <Input
                        label="Email"
                        labelClassName="auth-input-label"
                        value={user.email}
                        onChange={methods.handleFieldChange}
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
                <div className="mb-3">
                    <Input
                        label="Senha"
                        labelClassName="auth-input-label"
                        value={user.password}
                        onChange={methods.handleFieldChange}
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
                <div className="mb-5">
                    <Input
                        label="Confirmar senha"
                        labelClassName="auth-input-label"
                        value={user.confirmPassword}
                        onChange={methods.handleFieldChange}
                        placeholder="Confirme sua senha"
                        type="password"
                        id="confirm-pass"
                        name="confirmPassword"
                        autoComplete="new-password"
                        className="input-auth"
                        icon={<PasswordIcon className="auth-icon" stroke="auth-icon-svg" />}
                    />
                    {!flags.passConfirm && (
                        <div>
                            <ValidationMsg
                                className="mt-1"
                                message={errorMsgs.confirmPassword}
                            />
                        </div>
                    )}
                </div>
                <Button
                    disabled={isSubmiting ? true : false}
                    onClick={methods.signup}
                    className="create-form-button"
                    type="submit"
                >
                    {isSubmiting ? "Enviando..." : "Registrar"}
                </Button>
            </form>
            <Link className="login-signup-link" href="/login">
                Já é cadastrado ? Entre aqui!
            </Link>
        </>
    )
}
