import { useEffect } from "react"
import { baseApiUrl } from "../utils/constants"

//Buscando a lista de ciclo de pagamentos
export default function useFetchBillingCycles(setter) {
    useEffect(() => {
        fetchBillingCycles(setter)
    }, [setter])

    async function fetchBillingCycles(setter, { page, limit } = {}) {
        const queryString = page && limit ? `?page=${page}&limit=${limit}` : ""
        const url = `${baseApiUrl}/api/billing-cycles${queryString}`

        fetch(url)
            .then(async (response) => {
                const data = await response.json()
                if (!response.ok) throw new Error(data?.message || "Server internal error")
                return setter(data)
            })
            .catch((error) => {
                console.log(error)
                console.log(error.message)
            })
    }
}
