import propTypes from "prop-types"

export default function If({ condition, children }) {
    if (condition) {
        return children
    } else {
        return false
    }
}
If.propTypes = {
    condition: propTypes.any,
    children: propTypes.node
}
