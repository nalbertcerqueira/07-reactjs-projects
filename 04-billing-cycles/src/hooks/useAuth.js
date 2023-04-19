import { useState } from "react"
import { toast } from "react-toastify"

const errorsInitialState = { username: "", email: "", password: "", confirmPassword: "" }
const userInitialStatate = { username: "", email: "", password: "", confirmPassword: "" }
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
    500: "Desculpe, ocorreu um erro interno no servidor.",
    409: "Desculpe, o usuário informado ja possui um cadastro em nosso sistema.",
    inputValidationFailed: "Por favor, corrija os erros do formulário antes de enviá-lo."
}

//Hook utilizado nas páginas login.jsx e signup.jsx
export default function useAuth() {
    const [user, setUser] = useState(userInitialStatate)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [flags, setFlags] = useState(flagsInitialState)
    const [errorMsgs, setErrorMsgs] = useState(errorsInitialState)

    //Validando os inputs durante o processo de cadastro/login do usuário
    function validateInputs() {
        const { username, email, password, confirmPassword } = user
        const newFlags = {
            username: username.length >= 4 ? true : false,
            email: email.match(/\S+@\S+\.\S+/) ? true : false,
            confirmPassword:
                confirmPassword === password && confirmPassword !== "" ? true : false,
            password: password.length >= 6 && password.match(/^(?=.*[a-zA-Z])(?=.*\d).+$/)
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
        setUser(userInitialStatate)
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
        return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${path}`, {
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
                toast.error("Desculpe, ocorreu um erro interno no servidor.", {
                    toastId: "login-failed-500"
                })
                console.log(error.message)
            })
    }
    //Efetuando o login do usuário
    async function login(event) {
        event.preventDefault()
        const { email, password } = user
        const status = await submit({ email, password }, "api/login")

        setIsSubmiting(true)
        if (status >= 400 && status < 500) {
            resetForm()
            setFlags({ ...flags, email: true, password: false })
            setIsSubmiting(false)
            setErrorMsgs({
                ...errorMsgs,
                email: "",
                password: "Email e/ou senha inválido(s)."
            })
            return toast.error("Email e/ou senha inválidos!", {
                toastId: "login-failed-400"
            })
        } else if (status >= 500) {
            setIsSubmiting(false)
            resetForm()
            return toast.error("Desculpe, ocorreu um erro interno no servidor.", {
                toastId: "login-failed-500"
            })
        } else if (status === 200) {
            toast.success("Login bem sucedido!")
            setErrorMsgs(errorsInitialState)
            return location.assign("/")
        }
        return
    }
    //Efetuando o registro do usuário
    async function signup(event) {
        event.preventDefault()

        if (!validateInputs()) {
            return toast.error(toastMsgs.inputValidationFailed, { toastId: "submit-failed" })
        }

        setIsSubmiting(true)
        const status = await submit(user, "api/signup")
        switch (status) {
            case 200:
                toast.success(toastMsgs[200])
                return setTimeout(() => location.assign("/login"), 2000)

            case 400:
                setFlags({ ...flagsInitialState, confirmPassword: false })
                setErrorMsgs({
                    ...errorsInitialState,
                    confirmPassword: "As senhas não conferem."
                })
                break

            case 500:
                ;[setFlags(flagsInitialState), setErrorMsgs(errorsInitialState)]
                toast.error(toastMsgs[500], { toastId: "signup-failed-500" })
                break

            case 409:
                setFlags({ ...flagsInitialState, email: false })
                setErrorMsgs({
                    ...errorsInitialState,
                    email: "Este email ja possui um registro em nosso sistema."
                })
                toast.error(toastMsgs[409], { toastId: "sign-failed-409" })
                break
            default:
                break
        }
        setIsSubmiting(false)
    }
    //Deslogando o usuário da aplicação
    async function logout() {
        return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signout`)
            .then(async (response) => {
                const data = await response.json()
                console.log(data)
                location.reload()
            })
            .catch((error) => {
                console.log(error.message)
                location.reload()
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
