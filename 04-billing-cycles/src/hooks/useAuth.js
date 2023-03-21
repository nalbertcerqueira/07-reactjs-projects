import { useState } from "react"
import { toast } from "react-toastify"

const flagsInitialState = { username: true, email: true, password: true, passConfirm: true }
const errorsInitialState = { username: "", email: "", password: "", passConfirm: "" }
const defaultErrorsMsgs = {
    username: "O nome deve conter no mínimo 4 caracteres.",
    email: "Insira um email no formato exemplo@email.com.",
    password: "Senha de no mínimo 6 dígitos com letras e números.",
    passConfirm: "As senhas não conferem."
}
const toastMsgs = {
    200: "Parabéns! O seu cadastro foi realizado! Agora é só seguir com seu login.",
    500: "Desculpe, ocorreu um erro interno no servidor.",
    409: "Desculpe, o usuário informado ja possui um cadastro em nosso sistema.",
    inputValidationFailed: "Por favor, corrija os erros do formulário antes de enviá-lo."
}

//Hook utilizado nas páginas login.jsx e signup.jsx
export default function useAuth() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passConfirm, setPassConfirm] = useState("")

    const [isSubmiting, setIsSubmiting] = useState(false)
    const [flags, setFlags] = useState(flagsInitialState)
    const [errorMsgs, setErrorMsgs] = useState(errorsInitialState)

    //Validando os inputs durante o processo de cadastro de
    //um novo usuário
    function validateSignupInputs() {
        const newFlags = {
            username: username.length >= 4 ? true : false,
            email: email.match(/\S+@\S+\.\S+/) ? true : false,
            passConfirm: passConfirm === password && passConfirm !== "" ? true : false,
            password:
                password.length >= 6 && password.match(/^(?=.*[a-zA-Z])(?=.*\d).+$/)
                    ? true
                    : false
        }
        setErrorMsgs({
            username: newFlags.username ? "" : defaultErrorsMsgs.username,
            email: newFlags.email ? "" : defaultErrorsMsgs.email,
            password: newFlags.password ? "" : defaultErrorsMsgs.password,
            passConfirm: newFlags.passConfirm ? "" : defaultErrorsMsgs.passConfirm
        })
        setFlags({ ...flags, ...newFlags })

        return !Object.values(newFlags).includes(false)
    }

    async function submit(body, path) {
        return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${path}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
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
        const body = { username, email, password, confirmPassword: passConfirm }
        event.preventDefault()

        if (!validateSignupInputs()) {
            return toast.error(toastMsgs.inputValidationFailed, { toastId: "submit-failed" })
        }

        setIsSubmiting(true)
        const status = await submit(body, "api/signup")
        switch (status) {
            case 200:
                toast.success(toastMsgs[200])
                return setTimeout(() => location.assign("/login"), 2000)

            case 400:
                setFlags({ ...flagsInitialState, passConfirm: false })
                setErrorMsgs({ ...errorsInitialState, passConfirm: "As senhas não conferem" })
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

    //Resetando o formulário ao seu estado inicial
    function resetForm() {
        ;[setUsername(""), setEmail(""), setPassword(""), setPassConfirm("")]
        ;[setFlags(flagsInitialState), setErrorMsgs(errorsInitialState)]
    }

    return {
        username,
        email,
        password,
        passConfirm,
        flags,
        errorMsgs,
        isSubmiting,
        methods: {
            login,
            logout,
            signup,
            resetForm,
            changeFlags: (flags) => setFlags(flags),
            changeUser: (event) => setUsername(event.target.value),
            changeEmail: (event) => setEmail(event.target.value),
            changePassword: (event) => setPassword(event.target.value),
            changePassConfirm: (event) => setPassConfirm(event.target.value)
        }
    }
}
