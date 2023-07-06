//Definindo uma menssagem padrão para alguns tipos de validação.
export const localeConfig = {
    string: { min: "${path} deve conter no mínimo ${min} caracteres." },
    array: { min: "${path} precisa ser um array com no mínimo 1 item." },
    number: {
        min: "${path} deve ser um valor maior ou igual a ${min}.",
        max: "${path} deve ser um valor menor ou igual a ${max}."
    },
    mixed: {
        required: "${path} é um campo obrigatório.",
        notType: "${path} deve ser do tipo ${type}.",
        oneOf: "${path} deve ser um dos seguintes valores: ${values}",
        defined: "${path} deve ser um campo definido."
    }
}
