import propTypes from "prop-types"
import React, { useEffect } from "react"
import useTimer from "../hooks/useTimer"

//Componente utilizado em Deal.jsx em <main></main>
export default function Timer({ duration }) {
    //Utilizando hook useTimer para criar a funcionalidade de contagem regressiva
    const { time, countdown } = useTimer(duration)

    useEffect(countdown, [duration])

    return (
        <div className="timer">
            <div className="timer__item">
                <span className="timer__value">{`0${time.days}`.slice(-2)}</span>
                <span className="timer__unit">Dias</span>
            </div>
            <div className="timer__item">
                <span className="timer__value">{`0${time.hours}`.slice(-2)}</span>
                <span className="timer__unit">Horas</span>
            </div>
            <div className="timer__item">
                <span className="timer__value">{`0${time.min}`.slice(-2)}</span>
                <span className="timer__unit">Minutos</span>
            </div>
            <div className="timer__item">
                <span className="timer__value">{`0${time.sec}`.slice(-2)}</span>
                <span className="timer__unit">Segundos</span>
            </div>
        </div>
    )
}

Timer.propTypes = {
    duration: propTypes.number
}
