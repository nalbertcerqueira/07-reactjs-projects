//Classe responsável por criar os clientes com dados privados

export default class Costumer {
    #id
    #name
    #age

    constructor(name, age, id = null) {
        this.#id = id
        this.#name = name
        this.#age = age
    }

    static emptyCostumer() {
        return new Costumer("", 0)
    }

    get id() {
        return this.#id
    }
    get name() {
        return this.#name
    }

    get age() {
        return this.#age
    }

    set id(value) {
        this.#id = value
    }
}
