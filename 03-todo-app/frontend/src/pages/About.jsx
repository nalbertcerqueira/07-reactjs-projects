import React from "react"
import PageTitle from "../components/PageTitle.jsx"

//Page: página sobre, utilizada em AppRouter.jsx
export default function About() {
    return (
        <>
            <PageTitle title="Sobre" small="Nós" />
            <section className="px-3 sm:px-0 mt-8 animate-display">
                <article>
                    <h3 className="font-bold text-2xl text-neutral-700 mb-2">
                        Nossa História
                    </h3>
                    <p className="text-neutral-700 text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                        illo magni a dignissimos tempore ipsam adipisci voluptatibus
                        voluptas provident aperiam maiores, facilis sed, aliquam totam
                        sint at ullam quae laboriosam!
                    </p>
                </article>
                <article className="mt-4">
                    <h3 className="font-bold text-2xl text-neutral-700 mb-2">
                        Missão e Visão
                    </h3>
                    <p className="text-neutral-700 text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                        illo magni a dignissimos tempore ipsam adipisci voluptatibus
                        voluptas provident aperiam maiores, facilis sed, aliquam totam
                        sint at ullam quae laboriosam!
                    </p>
                </article>
                <article className="mt-4">
                    <h3 className="font-bold text-2xl text-neutral-700 mb-2">Imprensa</h3>
                    <p className="text-neutral-700 text-justify">
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
