import { useState } from "react"

//Hook utilizado para criar a funcionalidade de avaliação dos produtos
export default function useRatingBox() {
    const [starTypes, setStarsTypes] = useState(["far", "far", "far", "far", "far"])

    function updateStateFromProps(starRating) {
        const newState = starTypes.map((star, index) =>
            index <= starRating - 1 ? "fas" : "far"
        )
        setStarsTypes(newState)
    }

    function mouseClickHandler(event) {
        if (event.target.tagName === "svg") {
            const finalIndex = event.target.dataset.index
            const newState = starTypes.map((star, index) =>
                index <= finalIndex ? "fas" : "far"
            )
            setStarsTypes(newState)
        }
    }

    return {
        starTypes,
        mouseClickHandler,
        updateStateFromProps
    }
}
