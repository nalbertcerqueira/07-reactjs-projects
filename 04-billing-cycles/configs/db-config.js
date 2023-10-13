import { MongoClient } from "mongodb"

class DBClient {
    #isConnected = false

    constructor(url, dbName) {
        this.client = new MongoClient(url)
        this.db = this.client.db(dbName)
    }

    async connect() {
        this.clearListeners()

        this.client.on("connectionCreated", () => {
            console.log("mongodb connected with success!")
        })

        this.client.on("connectionClosed", () => {
            console.log("mongodb connection closed!")
        })

        try {
            if (!this.#isConnected) {
                await this.client.connect()
                this.#isConnected = true
            }
        } catch (error) {
            await this.client.close()
            this.clearListeners()
            this.#isConnected = false
            console.log(error)
            process.exit(1)
        }
    }

    clearListeners() {
        this.client.removeAllListeners("connectionCreated")
        this.client.removeAllListeners("connectionClosed")
    }
}

export const mongoClient = new DBClient(process.env.DB_URL, "billingCycleApp")
