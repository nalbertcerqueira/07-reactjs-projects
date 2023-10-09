import propTypes from "prop-types"
import React from "react"
import RatingBox from "./RatingBox"

//Componente utilizado em NewProducts.jsx e HotProducts.jsx em <main></main>
export default function Product(props) {
    //Formatando o valor passado em props.price para R$
    const priceInReal = Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL"
    }).format(props.price)

    return (
        <div className="product">
            <span
                className={`product__label ${
                    props.labelSolid ? "product__label--solid" : ""
                }`}
            >
                {props.label}
            </span>
            <img
                loading="lazy"
                className="product__img"
                src={props.srcImg}
                alt={props.productAlt}
                height={props.imgHeight}
                width={props.imgWidth}
            />
            <div className="product__info">
                <p className="product__category">{props.category}</p>
                <h2 className="product__name">{props.name}</h2>
                <p className="product__price">{priceInReal}</p>
                <RatingBox key={props.starRating} starRating={props.starRating} />
            </div>
            <a href="#" role="button" className="btn btn--cta">
                COMPRAR
            </a>
        </div>
    )
}
Product.propTypes = {
    productAlt: propTypes.string,
    srcImg: propTypes.string,
    imgHeight: propTypes.number,
    imgWidth: propTypes.number,
    category: propTypes.string,
    name: propTypes.string,
    price: propTypes.number,
    label: propTypes.string,
    starRating: propTypes.number,
    labelSolid: propTypes.bool
}
