import { useEffect } from "react"
import { baseApiUrl } from "../utils/constants"

//Buscando o resumo de créditos, débitos
export default function useFetchDashboard(setter) {
    useEffect(() => {
        refreshDashboard(setter)
    }, [setter])

    async function refreshDashboard(setter) {
        return fetch(`${baseApiUrl}/api/billing-cycles/summary`)
            .then(async (response) => {
                const data = await response.json()
                if (!response.ok) throw new Error(JSON.stringify(data))
                return setter({ data: data.summary, isLoading: false, error: false })
            })
            .catch(async (error) => {
                setter((prevState) => ({ ...prevState, isLoading: false, error: true }))
                console.log(error.message)
                console.log(error)
            })
    }
}
