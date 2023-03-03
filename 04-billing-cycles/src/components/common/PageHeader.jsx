import propTypes from "prop-types"

export default function PageHeader({ title, small }) {
    return (
        <section className="opacity-0 mb-5 border-b border-zinc-300 pb-3 animate-[show_0.2s_forwards]">
            <h1
                className={`text-zinc-700 text-3xl flex flex-wrap
                items-end gap-2`}
            >
                <span>{title}</span>
                <span className="text-lg font-normal text-zinc-500 whitespace-nowrap">
                    {small}
                </span>
            </h1>
        </section>
    )
}
PageHeader.propTypes = {
    title: propTypes.string,
    small: propTypes.string
}
