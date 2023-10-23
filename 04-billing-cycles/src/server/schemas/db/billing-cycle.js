import { ObjectId } from "mongodb"

const creditDBSchema = {
    bsonType: "object",
    additionalProperties: false,
    required: ["name", "value"],
    properties: {
        _id: {},
        name: { bsonType: "string", minLength: 4 },
        value: { bsonType: ["int", "double"], minimum: 0 }
    }
}

const debitDBSchema = {
    bsonType: "object",
    additionalProperties: false,
    required: ["name", "value", "status"],
    properties: {
        _id: {},
        name: { bsonType: "string", minLength: 4 },
        value: { bsonType: ["int", "double"], minimum: 0 },
        status: { bsonType: "string", enum: ["PENDENTE", "PAGO", "AGENDADO"] }
    }
}

//Esquema de validação de dados para a coleção 'billingCycles'.
export const BillingCycleDBSchema = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["name", "month", "year", "credits", "debts"],
        properties: {
            _id: {},
            userId: { bsonType: "string", minLength: 24 },
            name: { bsonType: "string", minLength: 4 },
            month: { bsonType: "int", minimum: 1, maximum: 12 },
            year: { bsonType: "int", minimum: 1970, maximum: 2100 },
            credits: { bsonType: "array", items: creditDBSchema },
            debts: { bsonType: "array", items: debitDBSchema }
        }
    }
}

export class BillingCycle {
    constructor(rawBilling) {
        this.userId = rawBilling.userId
        this.name = rawBilling.name.trim()
        this.month = rawBilling.month
        this.year = rawBilling.year
        this.credits = this.setUniqueIdPerTransaction(rawBilling.credits)
        this.debts = this.setUniqueIdPerTransaction(rawBilling.debts)
    }

    setUniqueIdPerTransaction(transactions) {
        return transactions.map((transaction) =>
            transaction._id
                ? { ...transaction }
                : { ...transaction, _id: new ObjectId().toString() }
        )
    }
}
