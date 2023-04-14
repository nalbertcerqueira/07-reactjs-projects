import { useState } from "react"

//Hook utilizado para criar a funcionalidade de avaliação dos produtos
export default function useRatingBox(starRating) {
    const [rating, setRating] = useState(starRating)

    function generateRatingArray(rating) {
        const ratingArray = []
        for (let i = 0; i <= 4; i++) {
            if (i <= rating - 1) ratingArray.push("fas")
            else ratingArray.push("far")
        }
        return ratingArray
    }

    function handleClick(event) {
        if (event.target.tagName === "svg") {
            const finalIndex = event.target.dataset.index
            setRating(parseInt(finalIndex))
        }
    }

    return {
        rating,
        handleClick,
        generateRatingArray
    }
}
