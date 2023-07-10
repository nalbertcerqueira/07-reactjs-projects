export class User {
    constructor(username, email, password) {
        this.username = username.trim()
        this.email = email.trim().toLowerCase()
        this.password = password
    }
}

//Esquema utilizado dentro do mongodb cloud, e configurado através do mongoDBCompass.
export const UserDBSchema = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["username", "email", "password"],
        properties: {
            _id: {},
            username: {
                bsonType: "string",
                minLength: 4
            },
            email: {
                bsonType: "string",
                minLength: 10,
                pattern: "^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{2,}\\.[a-zA-Z0-9]{2,}$"
            },
            password: {
                bsonType: "string",
                minLength: 6,
                pattern: "^(?=.*[a-zA-Z])(?=.*[0-9]).+$"
            }
        }
    }
}
