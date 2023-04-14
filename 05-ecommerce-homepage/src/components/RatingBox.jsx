import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import propTypes from "prop-types"
import React from "react"
import useRatingBox from "../hooks/useRatingBox"

//Componente utilizado em todos os produtos, vulgo Product.jsx
export default function RatingBox({ starRating }) {
    //Utilizando o hook useRatingBox para criar a funcionalidade de avaliação do produto
    const { rating, handleClick, generateRatingArray } = useRatingBox(starRating)

    //Gerando um array de classes css (fas ou far) a partir do estado
    const ratingArray = generateRatingArray(rating)

    function renderStars() {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    data-index={i}
                    className="rating-box__star-icon"
                    key={i}
                    icon={[ratingArray[i - 1], "star"]}
                />
            )
        }
        return stars
    }

    return (
        <div onClick={handleClick} className="rating-box">
            {renderStars()}
        </div>
    )
}
RatingBox.propTypes = {
    starRating: propTypes.number
}
