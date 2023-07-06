import { localeConfig } from "@/configs/yup-config"
import { object, ref, setLocale, string } from "yup"

setLocale(localeConfig)

const baseUserSchema = object({
    email: string()
        .min(10)
        .required()
        .matches(/^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z0-9]{2,}$/, {
            message: "o email deve seguir o formato 'nome@email.com'."
        }),
    password: string()
        .required()
        .min(6)
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/, {
            message: "${path} de no mínimo 6 caracteres com letras e números."
        })
})

//Schema de validação do usuário utilizado na rota POST: /api/login.
export const userLoginSchema = baseUserSchema
    .strict()
    .noUnknown("apenas os campos email e password são permitidos para o login do usuário.")

//Schema de validação do usuário utilizado na rota POST: /api/signup.
export const userSignupSchema = baseUserSchema
    .shape({
        username: string().min(4).required(),
        confirmPassword: string()
            .required()
            .oneOf([ref("password")])
    })
    .strict()
    .noUnknown(
        "apenas os campos username, email, password e confirmPassword são permitidos para o cadastro do usuário."
    )
