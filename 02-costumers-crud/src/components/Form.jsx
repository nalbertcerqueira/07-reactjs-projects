//Componente Form utilizado em index.jsx

import propTypes from "prop-types"
import { useState } from "react"

import Costumer from "../core/Costumer"
import Button from "./Button"
import Input from "./Input"

export default function Form(props) {
    /*Caso exista um id, estaremos lidando com a edição de dados de um cliente ja existente
    (PUT). Caso contrário, estaremos lidando com o cadastro de um novo cliente (POST)*/
    const id = props.costumer?.id
    const method = id ? "PUT" : "POST"

    const [name, setName] = useState(props.costumer?.name || "")
    const [age, setAge] = useState(props.costumer?.age || 0)

    function changeName(event) {
        setName(event.target.value)
    }
    function changeAge(event) {
        setAge(parseInt(event.target.value))
    }

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
                    value={name}
                    inputId="name"
                    label="Nome"
                    type="text"
                />
                <Input
                    onchange={changeAge}
                    value={age}
                    inputId="idade"
                    label="idade"
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
