import React from "react"
import Product from "../../Product"
import Prod1 from "/img/prod-1.jpg"
import Prod2 from "/img/prod-2.jpg"
import Prod3 from "/img/prod-3.jpg"
import Prod4 from "/img/prod-4.jpg"

//Componente utilizado em App.jsx
export default function NewProducts() {
    //Segunda sessão (novos produtos) de <main></main>
    return (
        <section className="products">
            <div className="products__inner">
                <h2 className="products__title">PRODUTOS NOVOS</h2>
                <div className="products__grid">
                    <Product
                        name="nome do produto"
                        price={124.9}
                        category="categoria"
                        srcImg={Prod1}
                        productAlt="product description"
                        starRating={5}
                        label="NEW"
                        labelSolid={true}
                    />
                    <Product
                        name="nome do produto"
                        price={124.9}
                        category="categoria"
                        srcImg={Prod2}
                        productAlt="product description"
                        starRating={4}
                        label="NEW"
                        labelSolid={true}
                    />
                    <Product
                        name="nome do produto"
                        price={124.9}
                        category="categoria"
                        srcImg={Prod3}
                        productAlt="product description"
                        starRating={5}
                        label="NEW"
                        labelSolid={true}
                    />
                    <Product
                        name="nome do produto"
                        price={124.9}
                        category="categoria"
                        srcImg={Prod4}
                        productAlt="product description"
                        starRating={4}
                        label="NEW"
                        labelSolid={true}
                    />
                </div>
            </div>
        </section>
    )
}
