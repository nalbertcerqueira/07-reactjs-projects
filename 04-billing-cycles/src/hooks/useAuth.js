import { useState } from "react"
import { baseApiUrl, basePath } from "../utils/constants"
import { toastEmmitter } from "../utils/client"

const errorsInitialState = { username: "", email: "", password: "", confirmPassword: "" }
const userInitialState = { username: "", email: "", password: "", confirmPassword: "" }
const flagsInitialState = {
    username: true,
    email: true,
    password: true,
    confirmPassword: true
}
const defaultErrorsMsgs = {
    username: "O nome deve conter no mínimo 4 caracteres.",
    email: "Insira um email no formato exemplo@email.com.",
    password: "Senha de no mínimo 6 dígitos com letras e números.",
    confirmPassword: "As senhas não conferem."
}
const toastMsgs = {
    200: "Parabéns! O seu cadastro foi realizado! Agora é só seguir com seu login.",
    400: "Por favor, corrija os campos do formulário para prosseguir com o cadastro.",
    500: "Desculpe, ocorreu um erro interno no servidor.",
    409: "Desculpe, o usuário informado ja possui um cadastro em nosso sistema.",
    inputValidationFailed: "Por favor, corrija os erros do formulário antes de enviá-lo."
}

//Hook utilizado nas páginas login.jsx e signup.jsx
export default function useAuth() {
    const [user, setUser] = useState(userInitialState)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [flags, setFlags] = useState(flagsInitialState)
    const [errorMsgs, setErrorMsgs] = useState(errorsInitialState)

    //Validando os inputs durante o processo de cadastro/login do usuário
    function validateInputs() {
        const emailRegex = /^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z0-9]{2,}$/
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/
        const { username, email, password, confirmPassword } = user
        const newFlags = {
            username: username.length >= 4 ? true : false,
            email: email.match(emailRegex) ? true : false,
            confirmPassword: confirmPassword === password && confirmPassword !== "" ? true : false,
            password: password.length >= 6 && password.match(passwordRegex)
        }
        setErrorMsgs({
            username: newFlags.username ? "" : defaultErrorsMsgs.username,
            email: newFlags.email ? "" : defaultErrorsMsgs.email,
            password: newFlags.password ? "" : defaultErrorsMsgs.password,
            confirmPassword: newFlags.confirmPassword ? "" : defaultErrorsMsgs.confirmPassword
        })
        setFlags({ ...flags, ...newFlags })

        return !Object.values(newFlags).includes(false)
    }
    //Resetando o formulário ao seu estado inicial
    function resetForm() {
        setUser(userInitialState)
        setFlags(flagsInitialState)
        setErrorMsgs(errorsInitialState)
    }
    //Controlando os inputs do formulário
    function handleFieldChange(event) {
        const fieldName = event.target.name
        const fieldValue = event.target.value
        setUser({ ...user, [fieldName]: fieldValue })
    }

    async function submit(body, path) {
        return fetch(`${baseApiUrl}/${path}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        })
            .then(async (response) => {
                console.log(await response.json())
                return response.status
            })
            .catch((error) => {
                resetForm()
                setIsSubmiting(false)
                toastEmmitter({
                    message: "Desculpe, ocorreu um erro interno no servidor.",
                    success: false,
                    id: "login-failed-500"
                })
                console.log(error.message)
            })
    }
    //Efetuando o login do usuário
    async function login(event) {
        event.preventDefault()
        setIsSubmiting(true)

        const { email, password } = user
        const status = await submit({ email: email.toLowerCase(), password }, "api/login")

        if (status >= 400 && status < 500) {
            resetForm()
            setFlags({ ...flags, email: true, password: false })
            setIsSubmiting(false)
            setErrorMsgs({
                ...errorMsgs,
                email: "",
                password: "Email e/ou senha inválido(s)."
            })
            return toastEmmitter({
                message: "Email e/ou senha inválidos!",
                success: false,
                id: "login-failed-400"
            })
        } else if (status >= 500) {
            setIsSubmiting(false)
            resetForm()
            return toastEmmitter({
                message: "Desculpe, ocorreu um erro interno no servidor.",
                success: false,
                id: "login-failed-500"
            })
        } else if (status === 200) {
            toastEmmitter({ message: "Login bem sucedido!", success: true })
            setErrorMsgs(errorsInitialState)
            return setTimeout(() => location.assign(basePath), 1000)
        }
        return
    }
    //Efetuando o registro do usuário
    async function signup(event) {
        const trimUser = {
            ...user,
            username: user.username.trim(),
            email: user.email.trim().toLowerCase()
        }
        event.preventDefault()

        if (!validateInputs()) {
            return toastEmmitter({
                message: toastMsgs.inputValidationFailed,
                success: false,
                id: "submit-failed"
            })
        }

        setIsSubmiting(true)
        const status = await submit(trimUser, "api/signup")
        switch (status) {
            case 200:
                toastEmmitter({ message: toastMsgs[200], success: true })
                return setTimeout(() => location.assign(`${basePath}login`), 2000)
            case 400:
                setFlags({ ...flagsInitialState, confirmPassword: false })
                setErrorMsgs({
                    ...errorsInitialState,
                    confirmPassword: "As senhas não conferem."
                })
                toastEmmitter({
                    message: toastMsgs[400],
                    success: false,
                    id: "signup-failed-400"
                })
                break
            case 500:
                setFlags(flagsInitialState)
                setErrorMsgs(errorsInitialState)
                toastEmmitter({
                    message: toastMsgs[500],
                    success: false,
                    id: "signup-failed-500"
                })
                break
            case 409:
                setFlags({ ...flagsInitialState, email: false })
                setErrorMsgs({
                    ...errorsInitialState,
                    email: "Este email já possui um registro em nosso sistema."
                })
                toastEmmitter({
                    message: toastMsgs[409],
                    success: false,
                    id: "signup-failed-409"
                })
                break
            default:
                break
        }
        setIsSubmiting(false)
    }
    //Deslogando o usuário da aplicação
    async function logout() {
        return fetch(`${baseApiUrl}/api/signout`, { method: "POST" })
            .then(async (response) => {
                const data = await response.json()
                console.log(data)
            })
            .catch((error) => {
                console.log(error.message)
            })
            .finally(() => {
                setTimeout(() => location.reload())
            })
    }

    return {
        user,
        flags,
        errorMsgs,
        isSubmiting,
        methods: {
            login,
            logout,
            signup,
            resetForm,
            changeFlags: (flags) => setFlags(flags),
            handleFieldChange
        }
    }
}
