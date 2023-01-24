//Componente Form utilizado em index.jsx
import propTypes from "prop-types"
import { useEffect } from "react"

import Costumer from "../core/Costumer"
import useForm from "../hooks/useForm"
import Button from "./Button"
import Input from "./Input"

export default function Form(props) {
    /*Caso exista um id, estaremos lidando com a edição de dados de um cliente ja existente
    (PUT). Caso contrário, estaremos lidando com o cadastro de um novo cliente (POST)*/
    const id = props.costumer?.id
    const method = id ? "PUT" : "POST"

    const {
        changeName,
        validateName,
        changeAge,
        validateAge,
        nameValid,
        ageValid,
        name,
        age
    } = useForm(props.costumer)

    useEffect(validateName, [name, validateName])
    useEffect(validateAge, [age, validateAge])

    return (
        <section>
            <form className="p-4 bg-gray-200 rounded-xl">
                {id ? (
                    <Input
                        classname="mb-4"
                        readOnly
                        value={id}
                        inputId="id"
                        label="Código"
                        type="text"
                    />
                ) : null}
                <Input
                    classname="mb-4"
                    onchange={changeName}
                    isValid={nameValid}
                    value={name}
                    inputId="name"
                    label="Nome"
                    type="text"
                />
                <Input
                    onchange={changeAge}
                    isValid={ageValid}
                    value={age}
                    inputId="idade"
                    label="Idade"
                    type="number"
                />
                <div className="mt-7 text-right">
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            props.saveForm(new Costumer(name, age, id), method)
                        }}
                        type="submit"
                        className="mr-4"
                        color="blue"
                    >
                        {id ? "Alterar" : "Salvar"}
                    </Button>
                    <Button onClick={props.cancelForm} type="button" color="gray">
                        Cancelar
                    </Button>
                </div>
            </form>
        </section>
    )
}

Form.propTypes = {
    children: propTypes.node,
    costumer: propTypes.object,
    cancelForm: propTypes.func,
    saveForm: propTypes.func
}
