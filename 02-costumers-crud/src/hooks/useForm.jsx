//useForm é um hook personalizado utilizado em Form.jsx

import { useState } from "react"

export default function useForm(costumer) {
    //Inputs para componetes controlados
    const [name, setName] = useState(costumer?.name || "")
    const [nameValid, setNameValid] = useState(costumer?.name == true)

    //Flag que define se o input está válido ou não para envio
    const [age, setAge] = useState(costumer?.age || 0)
    const [ageValid, setAgeValid] = useState(!isNaN(costumer?.age))

    //Onchange handlers para componentes controlados
    function changeName(event) {
        setName(event.target.value)
    }
    function changeAge(event) {
        setAge(parseInt(event.target.value))
    }

    //Funções executados em useEffect
    function validateAge() {
        const ageValid = isNaN(age)
        !ageValid ? setAgeValid(true) : setAgeValid(false)
    }
    function validateName() {
        const nameValid = name !== ""
        nameValid ? setNameValid(true) : setNameValid(false)
    }

    return {
        changeName,
        changeAge,
        validateAge,
        validateName,
        ageValid,
        nameValid,
        name,
        age
    }
}
