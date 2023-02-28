import propTypes from "prop-types"

export default function PageContent({ children, className }) {
    return <section className={className}>{children}</section>
}
PageContent.propTypes = {
    children: propTypes.node,
    className: propTypes.string
}
