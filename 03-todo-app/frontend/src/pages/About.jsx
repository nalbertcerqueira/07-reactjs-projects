import React from "react"
import PageTitle from "../components/PageTitle.jsx"

//Página de sobre, utilizada em AppRouter.jsx
export default function About() {
    return (
        <>
            <PageTitle title="Sobre" small="Nós" />
            <section className="about-container">
                <article>
                    <h3 className="about-container__topic-title">Nossa História</h3>
                    <p className="about-container__topic-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                        illo magni a dignissimos tempore ipsam adipisci voluptatibus
                        voluptas provident aperiam maiores, facilis sed, aliquam totam
                        sint at ullam quae laboriosam!
                    </p>
                </article>
                <article className="mt-4">
                    <h3 className="about-container__topic-title">Missão e Visão</h3>
                    <p className="about-container__topic-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                        illo magni a dignissimos tempore ipsam adipisci voluptatibus
                        voluptas provident aperiam maiores, facilis sed, aliquam totam
                        sint at ullam quae laboriosam!
                    </p>
                </article>
                <article className="mt-4">
                    <h3 className="about-container__topic-title">Imprensa</h3>
                    <p className="about-container__topic-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                        illo magni a dignissimos tempore ipsam adipisci voluptatibus
                        voluptas provident aperiam maiores, facilis sed, aliquam totam
                        sint at ullam quae laboriosam!
                    </p>
                </article>
            </section>
        </>
    )
}
