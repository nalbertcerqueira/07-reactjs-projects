import React from "react"
import Product from "../../Product"
import Prod1 from "/img/prod-1.webp"
import Prod2 from "/img/prod-2.webp"
import Prod3 from "/img/prod-3.webp"
import Prod4 from "/img/prod-4.webp"

const commonFields = {
    name: "nome do produto",
    price: 124.9,
    category: "categoria",
    productAlt: "descrição do produto",
    label: "NEW",
    labelSolid: true
}

const products = [
    {
        ...commonFields,
        srcImg: Prod1,
        imgWidth: 1000,
        imgHeight: 1000,
        starRating: 5
    },
    {
        ...commonFields,
        srcImg: Prod2,
        imgWidth: 1000,
        imgHeight: 1000,
        starRating: 4
    },
    {
        ...commonFields,
        srcImg: Prod3,
        imgWidth: 1000,
        imgHeight: 1000,
        starRating: 5
    },
    {
        ...commonFields,
        srcImg: Prod4,
        imgWidth: 1000,
        imgHeight: 1000,
        starRating: 4
    }
]

//Componente utilizado em App.jsx
export default function NewProducts() {
    //Segunda sessão (novos produtos)
    return (
        <section className="products">
            <div className="products__inner">
                <h2 className="products__title">PRODUTOS NOVOS</h2>
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
