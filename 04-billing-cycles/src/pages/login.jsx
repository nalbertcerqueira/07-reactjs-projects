import Link from "next/link"
import AuthTemplate from "../components/AuthTemplate"
import Button from "../components/common/Button"
import DefaultHead from "../components/common/DefaultHead"
import Input from "../components/common/Input"
import ValidationMsg from "../components/common/ValidationMsg"
import EmailIcon from "../components/icons/login-signup/EmailIcon"
import PasswordIcon from "../components/icons/login-signup/PasswordIcon"
import useAuth from "../hooks/useAuth"

Login.PageTemplate = AuthTemplate
export default function Login() {
    const { user, isSubmiting, flags, errorMsgs, methods } = useAuth()

    return (
        <>
            <DefaultHead title="MyMoney App - Login" />
            <form className="w-ful mb-5">
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
                <div className="mb-5">
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
