import { useEffect, useRef, useState } from "react"

//Hook utilizado parar criar a funcionalidade de contagem regressiva
//da promoção em Deal.jsx
export default function useTimer(duration) {
    const [time, setTime] = useState({ days: 0, hours: 0, min: 0, sec: 0 })
    const timerRef = useRef(null)

    useEffect(() => {
        countdown(duration)
        return () => clearInterval(timerRef.current)
    }, [duration])

    function countdown(duration) {
        const endDate = new Date(Date.now() + duration)
        timerRef.current = setInterval(() => {
            if (new Date() > endDate) return

            const remainingTime = endDate - new Date()
            const daysRest = remainingTime % (24 * 3600 * 1000)
            const hoursRest = daysRest % (3600 * 1000)
            const minutesRest = hoursRest % (60 * 1000)

            setTime({
                days: Math.floor(remainingTime / (24 * 3600 * 1000)),
                hours: Math.floor(daysRest / (3600 * 1000)),
                min: Math.floor(hoursRest / (60 * 1000)),
                sec: Math.floor(minutesRest / 1000)
            })
        }, 800)
    }

    return time
}
