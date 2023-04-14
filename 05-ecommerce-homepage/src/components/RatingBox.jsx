import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import propTypes from "prop-types"
import React, { useEffect } from "react"
import useRatingBox from "../hooks/useRatingBox"

//Componente utilizado em todos os produtos, vulgo Product.jsx
export default function RatingBox({ starRating }) {
    //Utilizando o hook useRatingBox para criar a funcionalidade de avaliação do produto
    const { starTypes, mouseClickHandler, updateStateFromProps } = useRatingBox()

    //Atualizando o estado em starTypes de acordo com o valor passado em starRating
    useEffect(() => {
        updateStateFromProps(starRating)
    }, [starRating])

    function renderStars() {
        const stars = []
        for (let i = 0; i <= 4; i++) {
            stars.push(
                <FontAwesomeIcon
                    data-index={i}
                    className="rating-box__star-icon"
                    key={i}
                    icon={[starTypes[i], "star"]}
                />
            )
        }
        return stars
    }

    return (
        <div onClick={mouseClickHandler} className="rating-box">
            {renderStars()}
        </div>
    )
}
RatingBox.propTypes = {
    starRating: propTypes.number
}
