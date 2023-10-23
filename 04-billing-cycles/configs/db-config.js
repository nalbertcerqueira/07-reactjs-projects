import { MongoClient } from "mongodb"
import { UserDBSchema } from "@/src/server/schemas/db/user"
import { BillingCycleDBSchema } from "@/src/server/schemas/db/billing-cycle"

class DBClient {
    #isConnected = false

    constructor(url, dbName) {
        this.client = new MongoClient(url)
        this.db = this.client.db(dbName)
    }

    clearListeners() {
        this.client.removeAllListeners("connectionCreated")
        this.client.removeAllListeners("connectionClosed")
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
                await this.createCollections()
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

    async createCollections() {
        try {
            await Promise.all([
                this.db.createCollection("users", { validator: UserDBSchema }),
                this.db.createCollection("billingCycles", { validator: BillingCycleDBSchema })
            ])
        } catch {
            null
        }
    }
}

export const mongoClient = new DBClient(process.env.DB_URL, "billingCycleApp")
