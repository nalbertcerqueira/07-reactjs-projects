import React from "react"

import Product from "../../Product"

import Prod5 from "/img/prod-5.webp"
import Prod6 from "/img/prod-6.webp"
import Prod7 from "/img/prod-7.webp"
import Prod8 from "/img/prod-8.webp"

const commonFields = {
    name: "nome do produto",
    price: 124.9,
    category: "categoria",
    productAlt: "descrição do produto",
    label: "HOT",
    labelSolid: false
}

const products = [
    {
        ...commonFields,
        srcImg: Prod5,
        imgWidth: 1000,
        imgHeight: 1000,
        starRating: 5
    },
    {
        ...commonFields,
        srcImg: Prod6,
        imgWidth: 1000,
        imgHeight: 1000,
        starRating: 4
    },
    {
        ...commonFields,
        srcImg: Prod7,
        imgWidth: 1000,
        imgHeight: 1000,
        starRating: 5
    },
    {
        ...commonFields,
        srcImg: Prod8,
        imgWidth: 1000,
        imgHeight: 1000,
        starRating: 4
    }
]

//Componente utilizado em App.jsx
export default function HotProducts() {
    //Quarta sessão (produtos mais vendidos)
    return (
        <section className="products">
            <div className="products__inner">
                <h2 className="products__title">MAIS VENDIDOS</h2>
                <div className="products__grid">
                    {products.map((product, i) => (
                        <Product
                            key={i}
                            name={product.name}
                            price={product.price}
                            category={product.category}
                            srcImg={product.srcImg}
                            imgWidth={product.imgWidth}
                            imgHeight={product.imgHeight}
                            productAlt={product.productAlt}
                            starRating={product.starRating}
                            label={product.label}
                            labelSolid={product.labelSolid}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
