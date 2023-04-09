import React from "react"

import Product from "../../Product"

import Prod5 from "/img/prod-5.jpg"
import Prod6 from "/img/prod-6.jpg"
import Prod7 from "/img/prod-7.jpg"
import Prod8 from "/img/prod-8.jpg"

//Componente utilizado em App.jsx
export default function HotProducts() {
    //Quarta sessão (produtos mais vendidos) de <main></main>
    return (
        <section className="products">
            <div className="products__inner">
                <h2 className="products__title">MAIS VENDIDOS</h2>
                <div className="products__grid">
                    <Product
                        name="nome do produto"
                        price={124.9}
                        category="categoria"
                        srcImg={Prod5}
                        productAlt="product description"
                        starRating={4}
                        label="HOT"
                        labelSolid={false}
                    />
                    <Product
                        name="nome do produto"
                        price={124.9}
                        category="categoria"
                        srcImg={Prod6}
                        productAlt="product description"
                        starRating={5}
                        label="HOT"
                        labelSolid={false}
                    />
                    <Product
                        name="nome do produto"
                        price={124.9}
                        category="categoria"
                        srcImg={Prod7}
                        productAlt="product description"
                        starRating={4}
                        label="HOT"
                        labelSolid={false}
                    />
                    <Product
                        name="nome do produto"
                        price={124.9}
                        category="categoria"
                        srcImg={Prod8}
                        productAlt="product description"
                        starRating={5}
                        label="HOT"
                        labelSolid={false}
                    />
                </div>
            </div>
        </section>
    )
}
